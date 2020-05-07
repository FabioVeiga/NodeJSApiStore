/**
 * Exportando bibliotecas
 * Set Schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//criando instancia para Schema
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}) 

module.exports = mongoose.model('Customer',schema)