const express = require('express');
const router = express.Router();
const usersHandler = require('./handlers/users');

router.get('/', usersHandler.getUsers);
router.get('/:id', usersHandler.getUser);
router.put('/:id', usersHandler.update);

module.exports = router;
