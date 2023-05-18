const express = require('express');
const check_token = require('../../middleware/auth/token.middleware');
const { get_me, get_user_and_post, get_All_user } = require('../../controllers/users/user.controller');
const router_user = express.Router()

router_user.route('/me').get(check_token, get_me)
router_user.route('/:username').get(check_token,get_user_and_post)
router_user.route('/users/all').get(check_token,get_All_user)

module.exports = router_user;