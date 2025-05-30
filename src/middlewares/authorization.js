const { user } = require("../models");
const { BaseError } = require("../common/responses/error-response");
const { StatusCodes } = require("http-status-codes");

/**
 * Middleware to verify user ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];
    if (!userId) {
      throw new BaseError(StatusCodes.UNAUTHORIZED, "User ID not provided");
    }

    const userData = await user.findByPk(userId);
    if (!userData) {
      throw new BaseError(StatusCodes.UNAUTHORIZED, "User not found");
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
