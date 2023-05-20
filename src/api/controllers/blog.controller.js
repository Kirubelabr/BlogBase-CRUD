const mongoose = require('mongoose');

const Blog = require('../models/blog.model');
const { listPerPage } = require('../../config/vars');

exports.loadAll = async (req, res, next) => {
  let page = req.query.page ? req.query.page - 1 : 0;
  try {
    let blogs = await Blog.find({ isActive: true })
      .sort({
        createdAt: 'asc',
      })
      .populate('author')
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
  const { blogId } = req.params;
  try {
    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: 'Invalid blog ID!' });
      }
      const blog = await Blog.findById(blogId).populate('author');
      if (!blog) {
        return res
          .status(404)
          .json({ status: false, message: 'Blog not found!' });
      }
      return res.status(200).json(blog);
    }
  } catch (err) {
    return next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    if (req.body) {
      const blog = new Blog(req.body);
      const savedBlog = await blog.save().populate('author');
      return res.status(201).json(savedBlog);
    }
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: 'Invalid blog ID!' });
      }
      const query = { _id: blogId };
      const update = {
        ...req.body,
        updatedAt: Date.now,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(query, update, {
        new: true,
        runValidators: true,
      }).then((blog) => blog.populate('author'));
      return res.status(200).json(updatedBlog);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: 'Invalid blog ID!' });
      }
      const blog = await Blog.find({ _id: blogId });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found!' });
      }
      if (blog && !blog.isActive) {
        return res.status(400).json({ message: 'Blog already deleted!' });
      }
      const message = 'Blog deleted successfully!';
      const query = { _id: blogId };
      const update = {
        isActive: false,
        updatedAt: Date.now,
      };
      await Blog.findByIdAndUpdate(query, update); // soft delete instead of remove
      return res.status(200).json({ message });
    }
  } catch (err) {
    next(err);
  }
};
