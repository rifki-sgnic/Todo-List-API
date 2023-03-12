const { Todo } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "todo not found.",
    });
  }

  return res.json({
    status: "success",
    data: todo,
  });
};
