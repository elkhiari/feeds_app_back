const express = require('express');
const check_token = require('../../middleware/auth/token.middleware');
const { add_post, get_all_posts_by_user, delete_post, get_post } = require('../../controllers/posts/post.controller');
const router_post = express.Router();

router_post.route('/post').post(check_token,add_post).get(check_token,get_all_posts_by_user)
router_post.route('/post/:id').delete(check_token,delete_post).get(check_token,get_post)

module.exports = router_post;