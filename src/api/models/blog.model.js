const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
 * Blog Schema
 * @private
 */
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      desc: 'Blog title',
      required: true,
    },
    content: {
      type: String,
      desc: 'Blog content',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      desc: 'Blog author',
      required: true,
    },
    type: { type: String, enum: ['blog', 'comment'], required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      default: null,
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: true,
  }
);

/**
 * @typedef Blog
 */
module.exports = mongoose.model('Blog', blogSchema);
