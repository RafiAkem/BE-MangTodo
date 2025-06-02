const express = require("express");

const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

// Mount auth routes directly
router.use("/", authRouter);
router.use("/user", userRouter);
router.use("/categories", categoryRouter);

module.exports = router;
