const express = require('express');
const router = express.Router();

const AuthAPI = require('../../api/AuthAPI');

router.post('/', AuthAPI.login);

module.exports = router;
