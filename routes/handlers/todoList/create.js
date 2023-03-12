const { Todo } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { task, description, isFinished, UserId } = req.body;
  const schema = {
    task: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const data = {
    task,
    description,
    UserId,
    isFinished: isFinished ? isFinished : 0,
  };

  const createTodo = await Todo.create(data);

  return res.json({
    status: "success",
    data: createTodo.id,
  });
};
