const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!',
        unique: true
    },
    content: {
        type: String,
        required: 'Content cannot be blank!',
        type: String,
        max: 100
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);