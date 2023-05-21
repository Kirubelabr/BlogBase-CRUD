const Joi = require('joi');

const blogValidator = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  intro: Joi.string().min(10).required(),
  content: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()),
  authorId: Joi.string().optional(), // disabled no Auth in the frontend
  isActive: Joi.boolean().optional(),
  author: Joi.optional(),
  id: Joi.optional(),
});

const validateBlog = async (req, res, next) => {
  const payload = req.body;
  try {
    await blogValidator.validateAsync(payload);
    next();
  } catch (err) {
    console.log(err);
    return res.status(406).send(err.details[0].message);
  }
};

module.exports = validateBlog;
