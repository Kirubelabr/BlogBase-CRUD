const Joi = require('joi');
const Blog = require('../models/blog.model');

module.exports = {
  // GET /v1/blogs
  loadBlogs: {
    query: {
      // page: Joi.number().min(1),
      // perPage: Joi.number().min(1).max(100),
    },
  },

  // POST /v1/blogs
  createBlog: {
    body: {
      title: Joi.string().max(50).required(),
      content: Joi.string().min(6).required(),
      author: Joi.string().required(),
    },
  },

  // PUT /v1/blogs/:blogId
  updateBlog: {
    body: {
      title: Joi.string().max(50),
      content: Joi.string().min(6),
    },
    params: {
      blogId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
