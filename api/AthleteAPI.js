const AthleteRepository = require('../repository/sequelize/AthleteRepository');
const TrasnferRepository = require('../repository/sequelize/TrasnferRepository');

exports.getAthletes = (req, res, next) => {
    AthleteRepository.getAthletes()
        .then(athletes => {
            res.status(200).json(athletes);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAthleteById = (req, res, next) => {
    const athleteId = req.params.athleteId;
    AthleteRepository.getAthleteById(athleteId)
        .then(athlete => {
            if (!athlete) {
                res.status(404).json({
                    message: 'Athlete with id: ' + athleteId + ' not found'
                })
            } else {
                res.status(200).json(athlete);
            }
        });
};

exports.createAthlete = (req, res, next) => {
    AthleteRepository.createAthlete(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAthlete = (req, res, next) => {
    const athleteId = req.params.athleteId;
    AthleteRepository.updateAthlete(athleteId, req.body)
        .then(result => {
            res.status(200).json({message: 'Athlete updated!', athlete: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteAthlete = (req, res, next) => {
    const athleteId = req.params.athleteId;
    AthleteRepository.deleteAthlete(athleteId)
        .then(result => {
            res.status(200).json({message: 'Removed athlete', athlete: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getAthleteTransferHistory = (req, res, next) => {
    const athleteId = req.params.athleteId;
    TrasnferRepository.getTransfersByAthleteId(athleteId)
        .then(transfers => {
            res.status(200).json(transfers);
        })
        .catch(err => {
            console.log(err);
        });
}

