const express = require('express');
const check_token = require('../../middleware/auth/token.middleware');
const { get_me, get_user_and_post } = require('../../controllers/users/user.controller');
const router_user = express.Router()

router_user.route('/me').get(check_token, get_me)
router_user.route('/:username').get(check_token,get_user_and_post)

module.exports = router_user;