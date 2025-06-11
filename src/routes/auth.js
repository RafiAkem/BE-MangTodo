const Router = require("express");
const { registerController } = require("../controller/auth/register");
const { loginController } = require("../controller/auth/login");
const {
  updateUsernameController,
  updatePasswordController,
} = require("../controller/auth/update");
const { authMiddleware } = require("../middlewares/authorization");

const router = Router();

router.post("/register", [], registerController);
router.post("/login", [], loginController);
router.put("/auth/username", authMiddleware, updateUsernameController);
router.put("/auth/password", authMiddleware, updatePasswordController);

module.exports = router;
