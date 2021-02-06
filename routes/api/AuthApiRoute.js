const express = require('express');
const router = express.Router();

const AuthAPI = require('../../api/AuthAPI');

router.post('/', AuthAPI.login);
router.post('/register', AuthAPI.register);

module.exports = router;
