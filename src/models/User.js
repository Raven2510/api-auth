const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('users', schema);