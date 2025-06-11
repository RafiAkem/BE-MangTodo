const JOI = require("joi");

const registerSchema = JOI.object({
  name: JOI.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),
  email: JOI.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: JOI.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

const loginSchema = JOI.object({
  email: JOI.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: JOI.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const updateUsernameSchema = JOI.object({
  name: JOI.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),
});

const updatePasswordSchema = JOI.object({
  currentPassword: JOI.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  newPassword: JOI.string().min(8).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters long",
    "any.required": "New password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUsernameSchema,
  updatePasswordSchema,
};
