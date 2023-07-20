const Joi = require("@hapi/joi");

const currentYear = new Date().getFullYear();

const bookSchema = Joi.object({
  id: Joi.number().integer().positive(),
  author_id: Joi.number().integer().positive(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publishedYear: Joi.number()
    .integer()
    .max(currentYear) // Use the current year as the maximum allowed value.
    .required(),
  content: Joi.string().trim().required().min(1), // Content is mandatory and must have at least one character.
});

module.exports = bookSchema;
