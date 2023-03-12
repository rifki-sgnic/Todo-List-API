const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const schema = {
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
    where: { email },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found.",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({
      status: "error",
      message: "email/password wrong",
    });
  }

  let token;
  try {
    token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    user.update({
      token
    })
  } catch (err) {
    const { status, data } = err.response;
    return res.status(status).json(data);
  }

  return res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    },
  });
};
