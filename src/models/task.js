const { DataTypes } = require("sequelize");

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
      priority: {
        type: DataTypes.ENUM("low", "med", "high"),
        defaultValue: "med",
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "in_progress", "complete"),
        defaultValue: "pending",
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
