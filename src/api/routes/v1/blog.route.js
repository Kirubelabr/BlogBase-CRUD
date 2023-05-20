const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog.controller');
const auth = require('../../middleware/auth');
const validateBlog = require('../../validations/blog.validation');

router.get('/', auth, blogController.loadAll);
router.get('/:blogId', auth, blogController.getBlogById);
router.post('/', auth, validateBlog, blogController.createBlog);
router.put('/:blogId', auth, validateBlog, blogController.updateBlog);
router.delete('/:blogId', auth, blogController.deleteBlog);

module.exports = router;
