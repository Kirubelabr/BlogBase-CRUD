const express = require('express');
const blogRoutes = require('./blog.route');
const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * v1/blogs
 */
router.use('/blogs', blogRoutes);

/**
 * v1/users
 */
router.use('/users', userRoutes);

module.exports = router;
