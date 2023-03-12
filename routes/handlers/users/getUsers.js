const { User, Todo } = require("../../../models");

module.exports = async (req, res) => {
  const userIds = req.query.userIds || [];

  const sqlOptions = {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    include: {
      model: Todo,
      as: 'todos'
    }
  };

  if (userIds.length) {
    sqlOptions.where = {
      id: userIds,
    };
  }

  const users = await User.findAll(sqlOptions);

  return res.json({
    status: "success",
    data: users,
  });
};
