module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "todos",
      timestamps: true,
    }
  );

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        as: "users",
      },
      onDelete: 'cascade'
    });
  }

  return Todo;
};
