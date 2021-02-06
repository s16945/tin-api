const authUtil = require("../util/authUtil");

const TransferRepository = require('../repository/sequelize/TrasnferRepository');

exports.getTransfers = (req, res, next) => {
    const userIO = authUtil.decodeToken(req).userID;
    TransferRepository.getTransfers(userIO)
        .then(transfers => {
            res.status(200).json(transfers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTransferById = (req, res, next) => {
    const transferId = req.params.transferId;
    TransferRepository.getTransferById(transferId)
        .then(transfer => {
            if (!transfer) {
                res.status(404).json({
                    message: 'Transfer with id: ' + transferId + ' not found'
                })
            } else {
                res.status(200).json(transfer);
            }
        });
};

exports.createTransfer = (req, res, next) => {
    TransferRepository.createTransfer(req.body)
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

exports.updateTransfer = (req, res, next) => {
    const transferId = req.params.transferId;
    TransferRepository.updateTransfer(transferId, req.body)
        .then(result => {
            res.status(200).json({message: 'Transfer updated!', transfer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTransfer = (req, res, next) => {
    const transferId = req.params.transferId;
    TransferRepository.deleteTransfer(transferId)
        .then(result => {
            res.status(200).json({message: 'Removed transfer', transfer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyTransfers = (req, res, next) => {
    const transferIds = req.query.transferIds;
    TransferRepository.deleteManyTransfers(transferIds)
        .then(result => {
            res.status(200).json({message: 'Removed transfers', transfers: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

