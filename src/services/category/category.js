const {
  BaseError,
  NotFoundError,
} = require("../../common/responses/error-response");
const { StatusCodes } = require("http-status-codes");
const { Category } = require("../../models");

const createCategory = async (userId, body) => {
  const category = await Category.create({
    ...body,
    userId,
  });

  return category;
};

const getCategories = async (userId) => {
  const categories = await Category.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  return categories;
};

const getCategoryById = async (userId, categoryId) => {
  const category = await Category.findOne({
    where: { id: categoryId, userId },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

const updateCategory = async (userId, categoryId, body) => {
  const category = await Category.findOne({
    where: { id: categoryId, userId },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  await category.update(body);
  return category;
};

const deleteCategory = async (userId, categoryId) => {
  const category = await Category.findOne({
    where: { id: categoryId, userId },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  await category.destroy();
  return { message: "Category deleted successfully" };
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};