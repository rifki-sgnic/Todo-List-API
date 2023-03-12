const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  const schema = {
    name: "string|empty:false",
    email: "string|empty:false",
    password: "string|empty:false|min:8",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exists.",
    });
  }

  const passwordEncrypted = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password: passwordEncrypted,
  };

  const createUser = await User.create(data);

  return res.json({
    status: "success",
    data: {
      id: createUser.id,
    },
  });
};
