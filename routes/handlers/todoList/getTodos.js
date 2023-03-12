const { Todo } = require("../../../models");

module.exports = async (req, res) => {
  const { userId } = req.query || undefined;

  const sqlOptions = {};

  if (userId !== undefined) {
    sqlOptions.where = {
      UserId: userId,
    };
  }

  const data = await Todo.findAll(sqlOptions);

  return res.json({
    status: "success",
    data,
  });
};
