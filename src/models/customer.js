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
    },
    roles :[{ //Array de string
        type: String,
        require: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
}) 

module.exports = mongoose.model('Customer',schema)