const Sequelize = require('sequelize');

const Athlete = require("../../model/sequelize/Athlete");
const Transfer = require("../../model/sequelize/Transfer");
const Manager = require("../../model/sequelize/Manager");

exports.getTransfers = () => {
    return Transfer.findAll({
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
        currentClub: data.currentClub,
        newClub: data.newClub,
        transferDate: data.transferDate,
        price: data.price,
        commission: data.commission,
        isLoan: data.isLoan,
        contractStartDate: data.contractStartDate,
        contractEndDate: data.contractEndDate,
    });
};

exports.updateTransfer = (transferId, data) => {
    return Transfer.update(data, {where: {_id: transferId}});
}

exports.deleteTransfer = (transferId) => {
    return Transfer.destroy({
        where: {_id: transferId}
    });
}

exports.deleteManyTransfers = (transferIds) => {
    return Transfer.find({_id: {[Sequelize.Op.in]: transferIds}})
}

