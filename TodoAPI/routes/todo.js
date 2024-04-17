const express = require('express');
const router = express.Router();
const todoCtrl = require('../controllers/todo');

const auth = require('../middleware/auth');

router.post('/getTodo', auth, todoCtrl.getTodos);
router.post('/updateTodo', auth, todoCtrl.updateTodo);

module.exports = router;