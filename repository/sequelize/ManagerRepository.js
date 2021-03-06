const Athlete = require("../../model/sequelize/Athlete");
const Transfer = require("../../model/sequelize/Transfer");
const Manager = require("../../model/sequelize/Manager");
const authUtil = require("../../util/authUtil");

exports.getManagers = () => {
    return Manager.findAll();
};

exports.getManagerById = (managerId) => {
    return Manager.findByPk(managerId,
        {
            include: [{
                model: Transfer,
                as: 'transfers',
                include: [{
                    model: Athlete,
                    as: 'athlete'
                }]
            }]
        });
};

exports.createManager = (data) => {
    return Manager.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        careerStartDate: data.careerStartDate,
        password: authUtil.hashPassword(data.password)
    });
};

exports.updateManager = (managerId, data) => {
    return Manager.update(data, {where: {_id: managerId}});
};

exports.deleteManager = (managerId) => {
    return Manager.destroy({
        where: {_id: managerId}
    });
};

exports.findByEmail = (email) => {
    return Manager.findOne({
        where: {email: email}
    });
};
