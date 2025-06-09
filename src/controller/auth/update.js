const BaseResponse = require("../../common/responses/base-response");
const { StatusCodes } = require("http-status-codes");
const {
  updateUsername,
  updatePassword,
} = require("../../services/auth/update");

const updateUsernameController = async (req, res, next) => {
  try {
    const result = await updateUsername(req.query.userId, req.body);
    return res.status(StatusCodes.OK).json(
      new BaseResponse({
        status: StatusCodes.OK,
        message: "Username updated successfully",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updatePasswordController = async (req, res, next) => {
  try {
    const result = await updatePassword(req.query.userId, req.body);
    return res.status(StatusCodes.OK).json(
      new BaseResponse({
        status: StatusCodes.OK,
        message: "Password updated successfully",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUsernameController,
  updatePasswordController,
};
