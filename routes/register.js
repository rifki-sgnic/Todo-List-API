const express = require("express");
const router = express.Router();
const registerHandler = require("./handlers/auth");

router.post("/", registerHandler.register);

module.exports = router;
