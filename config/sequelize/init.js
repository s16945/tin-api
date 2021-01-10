const sequelize = require('./sequelize');

const Athlete = require('../../model/sequelize/Athlete');
const Manager = require('../../model/sequelize/Manager');
const Transfer = require('../../model/sequelize/Transfer');
const authUtil = require("../../util/authUtil");

module.exports = () => {
    Athlete.hasMany(Transfer, {
        as: 'transfers',
        foreignKey: {name: 'athlete_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Transfer.belongsTo(Athlete, {as: 'athlete', foreignKey: {name: 'athlete_id', allowNull: false}});
    Manager.hasMany(Transfer, {
        as: 'transfers',
        foreignKey: {name: 'manager_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Transfer.belongsTo(Manager, {as: 'manager', foreignKey: {name: 'manager_id', allowNull: false}});

    let allAthletes, allManagers;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Athlete.findAll();
        })
        .then(athletes => {
            if (!athletes || athletes.length == 0) {
                return Athlete.bulkCreate([
                    {
                        firstName: 'Jan',
                        lastName: 'Kowalski',
                        email: 'jan.kowalski@sport.com',
                        phoneNumber: 123456,
                        birthDate: '1998-12-12'
                    },
                    {
                        firstName: 'Adam',
                        lastName: 'Zieliński',
                        email: 'adam.zielinski@football.com',
                        phoneNumber: 930213,
                        birthDate: '1988-01-03'
                    },
                    {
                        firstName: 'Marian',
                        lastName: 'Nowak',
                        email: 'marian.nowak@somesport.com',
                        phoneNumber: 1003203,
                        birthDate: '1990-05-10'
                    },
                ])
                    .then(() => {
                        return Athlete.findAll();
                    });
            } else {
                return athletes;
            }
        })
        .then(athletes => {
            allAthletes = athletes;
            return Manager.findAll();
        })
        .then(managers => {
            if (!managers || managers.length == 0) {
                return Manager.bulkCreate([
                    {
                        firstName: 'Pan',
                        lastName: 'Manager',
                        email: 'pan.manager@fabrykasportu.pl',
                        phoneNumber: 999222111,
                        careerStartDate: '1978-11-06',
                        password: authUtil.hashPassword("test1")
                    },
                    {
                        firstName: 'Zofia',
                        lastName: 'Małkowska',
                        email: 'malkowska.z@fabrykasportu.pl',
                        phoneNumber: 666777333,
                        careerStartDate: '1968-01-29',
                        password: authUtil.hashPassword("test2")
                    },
                    {
                        firstName: 'Marian',
                        lastName: 'Nowak',
                        email: 'nowak.m@fabrykasportu.pl',
                        phoneNumber: 168793209,
                        careerStartDate: '1990-01-03',
                        password: authUtil.hashPassword("test3")
                    },
                ])
                    .then(() => {
                        return Manager.findAll();
                    });
            } else {
                return managers;
            }
        })
        .then(managers => {
            allManagers = managers;
            return Transfer.findAll();
        })
        .then(transfers => {
            if (!transfers || transfers.length == 0) {
                return Transfer.bulkCreate([
                    {
                        athlete_id: allAthletes[0]._id,
                        manager_id: allManagers[0]._id,
                        currentClub: 'Juventus',
                        newClub: 'FC Bayern',
                        transferDate: '2020-11-15',
                        price: 100000,
                        commission: 5,
                        isLoan: false,
                        contractStartDate: '2020-12-01',
                        contractEndDate: '2022-12-01'
                    },
                    {
                        athlete_id: allAthletes[1]._id,
                        manager_id: allManagers[0]._id,
                        currentClub: 'Legia Warszawa',
                        newClub: 'Liverpool',
                        transferDate: '2020-01-02',
                        price: 650000,
                        commission: 2,
                        isLoan: true,
                        contractStartDate: '2020-02-01',
                        contractEndDate: '2021-02-01'
                    },
                    {
                        athlete_id: allAthletes[2]._id,
                        manager_id: allManagers[1]._id,
                        currentClub: 'FC Porto',
                        newClub: 'Athletic Bilbao',
                        transferDate: '2017-02-14',
                        price: 25000000,
                        commission: 4.5,
                        isLoan: false,
                        contractStartDate: '2018-02-01',
                        contractEndDate: '2023-02-01'
                    }
                ]);
            } else {
                return transfers;
            }
        });
};

