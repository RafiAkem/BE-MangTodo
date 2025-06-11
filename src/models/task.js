const { DataTypes, Op } = require("sequelize");

module.exports = (sequelize) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      dueTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("in_progress", "complete", "late"),
        defaultValue: "in_progress",
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "Tasks",
      hooks: {
        beforeCreate: async (task) => {
          // Set default status to in_progress for new tasks
          task.status = "in_progress";
        },
        beforeUpdate: async (task) => {
          // Combine dueDate and dueTime for comparison
          const now = new Date();
          let dueDateTime = null;

          if (task.dueDate) {
            dueDateTime = new Date(task.dueDate);
            if (task.dueTime) {
              const [hours, minutes, seconds] = task.dueTime
                .split(":")
                .map(Number);
              dueDateTime.setHours(hours, minutes, seconds || 0, 0);
            }
          }

          // If dueDateTime is in the past and the status is not explicitly set to complete,
          // then set it to 'late'.
          if (dueDateTime && dueDateTime < now && task.status !== "complete") {
            task.status = "late";
          }
        },
        beforeFind: async (options) => {
          // Only add the overdue check if it's not already in the where clause
          if (options.where && !options.where.status) {
            options.where.status = {
              [Op.ne]: "complete", // Not equal to complete
            };
          }
        },
      },
    }
  );

  Task.associate = (models) => {
    if (models.User) {
      Task.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
    if (models.Category) {
      Task.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  };

  return Task;
};
