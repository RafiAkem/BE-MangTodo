const {
  BaseError,
  NotFoundError,
} = require("../../common/responses/error-response");
const { StatusCodes } = require("http-status-codes");
const { user } = require("../../models");
const {
  updateUsernameSchema,
  updatePasswordSchema,
} = require("../../common/validation/auth/auth");
const { comparePassword, encryptPassword } = require("../../common/utils/user");

const updateUsername = async (userId, body) => {
  const { error } = updateUsernameSchema.validate(body);
  if (error) {
    throw new BaseError(StatusCodes.BAD_REQUEST, error.details[0].message);
  }

  const userData = await user.findByPk(userId);
  if (!userData) {
    throw new NotFoundError("User not found");
  }

  await userData.update({ name: body.name });
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
};

const updatePassword = async (userId, body) => {
  const { error } = updatePasswordSchema.validate(body);
  if (error) {
    throw new BaseError(StatusCodes.BAD_REQUEST, error.details[0].message);
  }

  const userData = await user.findByPk(userId);
  if (!userData) {
    throw new NotFoundError("User not found");
  }

  const isPasswordValid = await comparePassword(
    body.currentPassword,
    userData.password
  );
  if (!isPasswordValid) {
    throw new BaseError(
      StatusCodes.UNAUTHORIZED,
      "Current password is incorrect"
    );
  }

  const encryptedPassword = await encryptPassword(body.newPassword);
  await userData.update({ password: encryptedPassword });

  return {
    message: "Password updated successfully",
  };
};

module.exports = {
  updateUsername,
  updatePassword,
};
