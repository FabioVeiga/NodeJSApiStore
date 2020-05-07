/**
 * Importando
 * *bibliotecas
 * *Model
 */
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = async () => {//indica que eeh assincrono
    const res = await Product.find({ //cria uma variavel para aguardar a retorno
        active: true}, //somente os ativos
        'title price slug')
        return res //retorno variavel
    }

exports.getBySlug = async (slug) => { //rececbe o parametro
    const res = await Product.findOne({
        slug: slug, //fazendo o filtro pelo slug
        active: true}, //somente os ativos
        'title description price slug tags')//campos que quero mostrar no retorno
        return res
}

exports.getById = async (id) => { //rececbe o parametro
    const res = await Product.findById(id)
    return res
}

exports.getByTag = async (tag) => { //rececbe o parametro
    const res = await Product.find({
        tags: tag, //paramentr TAG e ja busca dentro do array
        active: true
    }, 'title description price slug tags')
    return res
}


exports.create = async (data) => {
     //instanciando a model passando o body (data) no paramentro
     let product = new Product(data)
     //usa o method save para savar o produto na instancia e por sua vez a model salva no mongo
    await product.save() //nao precisa criar outra variavel se a que temos foor o suficiente 
}

exports.update = async (id, data) => {
    await Product //retorn a Model
    .findByIdAndUpdate(id, { //acha por ID e faz o update
        $set:{
            //atrr para alterar
            title: data.title,
            description: data.description,
            price : data.price,
            slug: data.slug
        }
    })
}

exports.delete = async (id) => {
    await Product //return model
    .findByIdAndRemove(id)
}