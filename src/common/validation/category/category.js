const Joi = require("joi");

const createCategorySchema = Joi.object({
  userId: Joi.string().uuid().required(),
  name: Joi.string().required().min(1).max(100),
});

const updateCategorySchema = Joi.object({
  userId: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(100),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
