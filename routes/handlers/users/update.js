const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:8|empty:false",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found.",
    });
  }

  if (email) {
    const checkEmail = await User.findOne({
      where: { email },
    });

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: "error",
        message: "email already exists",
      });
    }
  }

  const passwordEncrypted = await bcrypt.hash(password, 10);

  await user.update({
    name,
    email,
    passwordEncrypted,
  });

  return res.json({
    status: "success",
    data: {
      id: user.id,
      name,
      email,
    },
  });
};
