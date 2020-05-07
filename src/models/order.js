/**
 * Exportando bibliotecas
 * Set Schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//criando instancia para Schema
const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, //Tipo eh um objeto
        ref: 'Customer', //minha referencia
    },
    number: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now() //pega agora de geracao
    },
    status: {
        type: String,
        required: true,
        enum: ['created','done'], //enum
        default: 'created' //pega agora de geracao
    },
    items: [{ //array recendo quantidade, preco e o produto
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId, //Tipo eh um objeto
            ref: 'Product', //minha referencia
        }
    }]
}) 

module.exports = mongoose.model('Order',schema)