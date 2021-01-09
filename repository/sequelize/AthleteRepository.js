const Athlete = require("../../model/sequelize/Athlete");
const Transfer = require("../../model/sequelize/Transfer");
const Manager = require("../../model/sequelize/Manager");

exports.getAthletes = () => {
    return Athlete.findAll();
};

exports.getAthleteById = (athleteId) => {
    return Athlete.findByPk(athleteId,
        {
            include: [{
                model: Transfer,
                as: 'transfers',
                include: [{
                    model: Manager,
                    as: 'manager'
                }]
            }]
        });
};

exports.createAthlete = (data) => {
    return Athlete.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate
    });
};

exports.updateAthlete = (athleteId, data) => {
    return Athlete.update(data, {where: {_id: athleteId}});
};

exports.deleteAthlete = (athleteId) => {
    return Athlete.destroy({
        where: {_id: athleteId}
    });
};
