const express = require('express');
const {login, register} = require('../../controllers/users/auth.controller');
const { userAlreadyExists } = require('../../middleware/user/auth.middleware');
const router_Auth = express.Router();

router_Auth.post('/auth/login', login);
router_Auth.post('/auth/register', userAlreadyExists,register);

module.exports = router_Auth;