const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
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
    },
    {
      timestamps: true,
      tableName: "Categories",
    }
  );

  Category.associate = (models) => {
    if (models.User) {
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
    if (models.Task) {
      Category.hasMany(models.Task, {
        foreignKey: "categoryId",
        as: "tasks",
      });
    }
  };

  return Category;
};
