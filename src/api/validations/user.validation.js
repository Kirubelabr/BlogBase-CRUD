const Joi = require('joi');

const userValidator = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string(),
});

const validateUser = async (req, res, next) => {
  const payload = req.body;
  try {
    await userValidator.validateAsync(payload);
    next();
  } catch (err) {
    console.log(err);
    return res.status(406).send(err.details[0].message);
  }
};

module.exports = validateUser;
