const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog.controller');
const { auth, LOGGED_USER } = require('../../middleware/auth');
const { validate } = require('express-validation');
const { loadBlogs, updateBlog } = require('../../validations/blog.validation');

router
  .route('/')
  .get(auth(LOGGED_USER), validate(loadBlogs), blogController.loadAll)
  .post(auth(LOGGED_USER), validate(createBlog));

router
  .route('/:blogId')
  .get(auth(LOGGED_USER), blogController.findOne)
  .put(auth(LOGGED_USER), validate(updateBlog), blogController.update)
  .delete(auth(LOGGED_USER), blogController.remove);

module.exports = router;
