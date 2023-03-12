const express = require("express");
const router = express.Router();
const logoutHandler = require("./handlers/auth");

router.post("/", logoutHandler.logout);

module.exports = router;
