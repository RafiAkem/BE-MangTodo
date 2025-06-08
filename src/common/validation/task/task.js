const Joi = require("joi");

const createTaskSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  title: Joi.string().required().min(1).max(200),
  description: Joi.string().allow("").max(1000),
  dueDate: Joi.date().iso().allow(null),
  dueTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
    .allow(null),
  status: Joi.string()
    .valid("in_progress", "complete", "late")
    .default("in_progress"),
  categoryId: Joi.string().uuid().allow(null),
});

const updateTaskSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  title: Joi.string().min(1).max(200),
  description: Joi.string().allow("").max(1000),
  dueDate: Joi.date().iso().allow(null),
  dueTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
    .allow(null),
  status: Joi.string().valid("in_progress", "complete", "late"),
  categoryId: Joi.string().uuid().allow(null),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
