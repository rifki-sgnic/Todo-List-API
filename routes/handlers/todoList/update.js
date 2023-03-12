const { Todo } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { task, description, isFinished } = req.body;
  const { id } = req.params;

  // const schema = {
  //   task: "string|empty:false",
  // };

  // const validate = v.validate(req.body, schema);

  // if (validate.length) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: validate,
  //   });
  // }
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "todo not found.",
    });
  }

  await todo.update({
    task,
    description,
    UserId: todo.UserId,
    isFinished,
  });

  return res.json({
    status: "success",
    data: {
      id: todo.id,
      task,
      description,
      isFinished,
    },
  });
};
