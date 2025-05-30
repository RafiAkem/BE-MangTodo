const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().required().min(1).max(200),
  description: Joi.string().allow("").max(1000),
  dueDate: Joi.date().iso().allow(null),
  priority: Joi.string().valid("low", "med", "high").default("med"),
  status: Joi.string()
    .valid("pending", "in_progress", "complete")
    .default("pending"),
  categoryId: Joi.string().uuid().allow(null),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  description: Joi.string().allow("").max(1000),
  dueDate: Joi.date().iso().allow(null),
  priority: Joi.string().valid("low", "med", "high"),
  status: Joi.string().valid("pending", "in_progress", "complete"),
  categoryId: Joi.string().uuid().allow(null),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
