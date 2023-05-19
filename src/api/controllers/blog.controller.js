const httpStatus = require('http-status');
const Blog = require('../models/blog.model');

exports.loadAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isActive: true })
      .sort({
        createdAt: 'asc',
      })
      .exec();
    res.json(blogs);
  } catch (err) {
    return next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId).exec();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const blog = new Candidate(req.body);
    const savedBlog = await blog.save();
    res.status(httpStatus.CREATED);
    res.json(savedBlog);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const options = { upsert: false, new: true, useFindAndModify: false };
    const query = { _id: req.params.blogId };
    const update = {
      $set: {
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now,
      },
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
      query,
      update,
      options
    ).exec();
    res.status(httpStatus['200_MESSAGE']).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const message = 'Deleted successfully!';
    const options = { upsert: false, new: true, useFindAndModify: false };
    const query = { _id: req.params.blogId };
    const update = {
      $set: {
        isActive: false,
        updatedAt: Date.now,
      },
    };
    await Blog.findByIdAndUpdate(query, update, options).exec();
    res.status(httpStatus.NO_CONTENT).json({ message });
  } catch (err) {
    next(err);
  }
};
