const { User } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  if (!user) {
    return res
      .json({
        status: "error",
        message: "user not found.",
      })
      .status(404);
  }

  return res.json({
    status: "success",
    data: user,
  });
};
