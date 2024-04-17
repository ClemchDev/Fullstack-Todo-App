const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    todos: { type: Array, required: true }
});

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);