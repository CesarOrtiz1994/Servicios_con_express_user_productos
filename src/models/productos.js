const e = require('express');
const mongoose = require('mongoose');

//crear el esquema
const productoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Producto', productoSchema);