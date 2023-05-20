const Blog = require('../models/blog.model');
const { listPerPage } = require('../../config/vars');

exports.loadAll = async (req, res, next) => {
  try {
    let page = req.query.page ? req.query.page - 1 : 0;
    let blogs = await Blog.find({ isActive: true })
      .sort({
        createdAt: 'asc',
      })
      .limit(listPerPage)
      .skip(page * listPerPage);
    const pagination = {};
    const count = await Blog.count();
    pagination.currentPage = page + 1;
    pagination.totalPage = Math.ceil(count / listPerPage);
    return res.status(200).json({ blogs, pagination });
  } catch (err) {
    return next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params.id;
    if (blogId) {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res
          .status(404)
          .json({ status: false, message: 'Blog not found!' });
      }
      return res.status(200).json({ blog });
    }
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    if (req.body) {
      const blog = new Blog(req.body);
      const savedBlog = await blog.save();
      return res.status(201).json({ savedBlog });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    if (req.params.blogId) {
      const query = { _id: req.params.blogId };
      const update = {
        ...req.body,
        updatedAt: Date.now,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(query, update, {
        new: true,
        runValidators: true,
      });
      return res.status(201).json({ updatedBlog });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    if (req.params.blogId) {
      const message = 'Blog deleted successfully!';
      const query = { _id: req.params.blogId };
      const update = {
        isActive: false,
        updatedAt: Date.now,
      };
      await Blog.findByIdAndUpdate(query, update);
      return res.status(204).json({ message });
    }
  } catch (err) {
    next(err);
  }
};
