const {
  BaseError,
  NotFoundError,
} = require("../../common/responses/error-response");
const { StatusCodes } = require("http-status-codes");
const { Task, Category } = require("../../models");

const createTask = async (userId, body) => {
  if (body.categoryId) {
    const category = await Category.findOne({
      where: { id: body.categoryId, userId },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  const task = await Task.create({
    ...body,
    userId,
  });

  return task;
};

const getTasks = async (userId, query = {}) => {
  const where = { userId };

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.priority) {
    where.priority = query.priority;
  }

  const tasks = await Task.findAll({
    where,
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  // Check for overdue tasks
  const now = new Date();
  for (const task of tasks) {
    if (task.status === "complete") continue;

    let dueDateTime = null;
    if (task.dueDate) {
      dueDateTime = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes, seconds] = task.dueTime.split(":").map(Number);
        dueDateTime.setHours(hours, minutes, seconds || 0, 0);
      } else {
        // If no dueTime is set, set it to end of day
        dueDateTime.setHours(23, 59, 59, 999);
      }
    }

    if (dueDateTime && dueDateTime < now) {
      task.status = "late";
      await task.save();
    }
  }

  return tasks;
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  return task;
};

const updateTask = async (userId, taskId, body) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    return {
      success: true,
      message: "Task not found or already deleted",
      updated: false,
    };
  }

  if (body.categoryId) {
    const category = await Category.findOne({
      where: { id: body.categoryId, userId },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  await task.update(body);
  return {
    success: true,
    message: "Task updated successfully",
    updated: true,
    data: task,
  };
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (task) {
    await task.destroy();
    return {
      success: true,
      message: "Task deleted successfully",
      deleted: true,
    };
  }

  return {
    success: true,
    message: "Task not found or already deleted",
    deleted: false,
  };
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
