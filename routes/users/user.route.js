const express = require('express');
const check_token = require('../../middleware/auth/token.middleware');
const { get_me } = require('../../controllers/users/user.controller');
const router_user = express.Router()

router_user.route('/me').get(check_token, get_me)

module.exports = router_user;