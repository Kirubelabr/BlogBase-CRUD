const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwtSecret } = require('../../config/vars');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, jwtSecret);
    const user = await User.findOne({ 'tokens.token': token });
    if (!user || !data) {
      res
        .status(401)
        .send({ message: 'Not authorized to access this resource!' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized or Your Session Expired! May Login Back Again!',
    });
  }
};

module.exports = auth;
