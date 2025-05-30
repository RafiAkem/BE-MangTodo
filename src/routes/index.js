const express = require("express");

const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");

// Mount auth routes directly
router.use("/", authRouter);
router.use("/user", userRouter);

module.exports = router;
