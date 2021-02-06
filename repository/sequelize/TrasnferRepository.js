const Sequelize = require('sequelize');

const Athlete = require("../../model/sequelize/Athlete");
const Transfer = require("../../model/sequelize/Transfer");
const Manager = require("../../model/sequelize/Manager");
const sequelize = require('../../config/sequelize/sequelize');

exports.getTransfers = (managerId) => {
    return Transfer.findAll({
        where: {
            manager_id: managerId
        },
        include: [
            {
                model: Athlete,
                as: 'athlete'
            },
            {
                model: Manager,
                as: 'manager'
            }]
    });
};

exports.getTransfersByAthleteId = (athleteId) => {
    return Transfer.findAll({
        where: {
            athlete_id: athleteId
        },
        include: [
            {
                model: Manager,
                as: 'manager'
            },
            {
                model: Athlete,
                as: 'athlete'
            }]
    });
}


exports.getTransferById = (transferId) => {
    return Transfer.findByPk(transferId, {
        include: [
            {
                model: Athlete,
                as: 'athlete'
            },
            {
                model: Manager,
                as: 'manager'
            }]
    });
};

exports.createTransfer = (data) => {
    return Transfer.create({
        athlete_id: data.athlete_id,
        manager_id: data.manager_id,
        newClub: data.newClub,
        transferDate: data.transferDate,
        price: data.price,
        commission: data.commission,
        isLoan: data.isLoan,
        contractStartDate: data.contractStartDate,
        contractEndDate: data.contractEndDate,
    });
};

exports.updateTransfer = async (transferId, data) => {
    const t = await sequelize.transaction();
    try {
        const athUpdate = await Athlete.update({currentClub: data.newClub}, {where: {_id: data.athlete_id}}, {transaction: t})
        const transferUpdate = await Transfer.update(data, {where: {_id: transferId}}, {transaction: t});
        await t.commit();
        return transferUpdate;
    } catch (error) {
        await t.rollback();
    }
}

exports.deleteTransfer = (transferId) => {
    return Transfer.destroy({
        where: {_id: transferId}
    });
}

exports.deleteManyTransfers = (transferIds) => {
    return Transfer.find({_id: {[Sequelize.Op.in]: transferIds}})
}

