const express = require('express');
const check_token = require('../../middleware/auth/token.middleware');
const { add_post } = require('../../controllers/posts/post.controller');
const router_post = express.Router();

router_post.route('/post').post(check_token,add_post)

module.exports = router_post;