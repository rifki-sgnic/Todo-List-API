const express = require("express");
const router = express.Router();
const todoListHandler = require("./handlers/todoList");

router.get("/", todoListHandler.getTodos);
router.post("/create", todoListHandler.create);
router.get("/:id", todoListHandler.getTodo);
router.put("/:id", todoListHandler.update);
router.delete("/:id", todoListHandler.destroy);

module.exports = router;
