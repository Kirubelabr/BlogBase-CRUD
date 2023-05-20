const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog.controller');
const auth = require('../../middleware/auth');

router.get('/', blogController.loadAll);
router.get('/:blogId', blogController.getBlogById);
router.post('/', blogController.createBlog);
router.put('/', blogController.updateBlog);

module.exports = router;
