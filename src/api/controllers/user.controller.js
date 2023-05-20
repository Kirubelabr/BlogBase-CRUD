const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/user.model');
const { listPerPage } = require('../../config/vars');

exports.loadAll = async (req, res, next) => {
  let page = req.query.page ? req.query.page - 1 : 0;
  try {
    const users = await User.find({ isActive: true })
      .sort({ createdAt: 'desc' })
      .limit(listPerPage)
      .skip(page * listPerPage);
    const pagination = {};
    const count = await User.count();
    pagination.currentPage = page + 1;
    pagination.totalPage = Math.ceil(count / listPerPage);
    return res.status(200).json({ users, pagination });
  } catch (err) {
    return next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID!' });
      }
    }
    const user = await User.findById(userId);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User({
      ...req.body,
    });

    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const query = { _id: req.params.userId };
  const update = {
    name: req.body.name,
    email: req.body.email,
    updatedAt: Date.now,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(query, update, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (userID) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID!' });
      }
      const user = await User.find({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      if (user && !user.isActive) {
        return res.status(400).json({ message: 'User already deleted!' });
      }
      const message = 'User deleted successfully!';
      const query = { _id: userId };
      const update = {
        isActive: false,
        updatedAt: Date.now,
      };
      await User.findByIdAndUpdate(query, update); // soft delete instead of remove
      return res.status(200).json({ message });
    }
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Email or Password Incorrect!' });
    }
    const token = await user.generateAuthToken();
    return res.status(200).send({ user, token });
  } catch (err) {
    return next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const { email, previousPassword, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 8);

  try {
    const user = await User.findByCredentials(email, previousPassword);
    if (!user) {
      return res.status(401).send({ error: 'Previous Password Is Incorrect!' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      function (err, result) {
        if (err) {
          return res.status(500).json({ message: 'Something went wrong!' });
        }
      }
    );
    return res.status(200).json({
      message: 'Password Successfully Changed!',
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
