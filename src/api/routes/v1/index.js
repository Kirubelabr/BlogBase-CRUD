const express = require('express');
const blogRoutes = require('./');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

module.exports = router;
