const express = require("express");

const router = express.Router();
const authRouter = require("./auth");
const categoryRouter = require("./category");
const taskRouter = require("./task");

// Mount auth routes directly
router.use("/", authRouter);
router.use("/categories", categoryRouter);
router.use("/tasks", taskRouter);

module.exports = router;
