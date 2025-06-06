const { StatusCodes } = require("http-status-codes");
const taskService = require("../../services/task/task");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../../common/validation/task/task");

const createTask = async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const task = await taskService.createTask(req.body.userId, req.body);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: task,
  });
};

const getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.body.userId, req.query);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: tasks,
  });
};

const getTaskById = async (req, res) => {
  const task = await taskService.getTaskById(req.body.userId, req.params.id);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: task,
  });
};

const updateTask = async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const task = await taskService.updateTask(
    req.body.userId,
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    data: task,
  });
};

const deleteTask = async (req, res) => {
  const result = await taskService.deleteTask(req.body.userId, req.params.id);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: result,
  });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
