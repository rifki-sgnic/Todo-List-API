const express = require("express");
const router = express.Router();
const loginHandler = require("./handlers/auth");

router.post("/", loginHandler.login);

module.exports = router;
