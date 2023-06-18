const e = require('express');
const mongoose = require('mongoose');

//crear el esquema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);