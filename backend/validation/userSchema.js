const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  id: Joi.number().integer().positive(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

module.exports = {
  registerSchema,
  loginSchema,
};
