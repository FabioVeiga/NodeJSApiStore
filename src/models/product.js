/**
 * Exportando bibliotecas
 * Set Schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//criando instancia para Schema
const schema = new Schema({
    /**
     * Schema cria automaticamente o ID
     * atributos do model
     */
    title: {
        type: String, //tipo string
        required: [true,"Titulo obrigatorio"], //eh requerido
        trim: true //retira os espacos da string
    },
    slug:{//vai compor a URL Ex: chair game = chair-game
        type: String,
        required: [true,"Slug obrigatorio"],
        trim: true,
        index: true, //criando index
        unique: true //eh um unique
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true //setando valor default como TRUE
    },
    tags :[{ //Array de string
        type: String,
        require: true
    }],
    image: {
        type: String, //caminho da imagem
        required: true, //eh requerido
        trim: true //retira os espacos da string
    }
}) 

/**
 * Exportando schema
 * passando nos paramentros
 * *1-Product (nome do schema)
 * *2-Schema
 */
module.exports = mongoose.model('Product',schema)