const { StatusCodes } = require("http-status-codes");
const categoryService = require("../../services/category/category");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../common/validation/category/category");

const createCategory = async (req, res) => {
  const { error } = createCategorySchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const category = await categoryService.createCategory(
    req.body.userId,
    req.body
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: category,
  });
};

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories(req.query.userId);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: categories,
  });
};

const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(
    req.query.userId,
    req.params.id
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    data: category,
  });
};

const updateCategory = async (req, res) => {
  const { error } = updateCategorySchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const category = await categoryService.updateCategory(
    req.body.userId,
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    data: category,
  });
};

const deleteCategory = async (req, res) => {
  const result = await categoryService.deleteCategory(
    req.body.userId,
    req.params.id
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    data: result,
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
