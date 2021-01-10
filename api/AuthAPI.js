const ManagerRepository = require('../repository/sequelize/ManagerRepository');
const authUtil = require("../util/authUtil");
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    ManagerRepository.findByEmail(email)
        .then(manager => {
            if (!manager) {
                const err = new Error("Użytkownik o podanym adresie email nie istnieje")
                err.code = 400;
                throw err;
            } else if (authUtil.comparePasswords(password, manager.password) === true) {
                const token = jwt.sign({userID: manager._id}, '3lQlhbogjkf47exA2u8JuIMYiSgX11hl', {expiresIn: '2h'});
                res.send({token});
            } else {
                const err = new Error("Niepoprawne hasło")
                err.code = 400;
                throw err;
            }
        })
        .catch(err => {
            next(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
}
