const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog.controller');
const auth = require('../../middleware/auth');
const validateBlog = require('../../validations/blog.validation');

router.get('/', blogController.loadAll);
router.get('/:blogId', blogController.getBlogById);
router.post('/', validateBlog, blogController.createBlog);
router.put('/:blogId', validateBlog, blogController.updateBlog);
router.delete('/:blogId', blogController.deleteBlog);

module.exports = router;
