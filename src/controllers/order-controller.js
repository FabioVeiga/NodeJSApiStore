const ValitadionContract = require('../validator/fluent-validator')
const repository = require('../repositories/order-repository')
const guid = require('guid')

exports.post = async (req, res, next) => {
    let data = {
        customer: req.body.customer,
        number: guid.raw().substring(0,6), //gera um guid pegando os 6 primeiros caracteres
        items: req.body.items
    }
    console.log(data.items)
    try{        
        await repository.create(data)
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        })
    }catch(erro){
        res.status(400).send({
            message: 'Falha ao cadastrar sua requisicao!' ,
            data: erro
        })
    }
}

exports.get = async (req, res, next) => {
    try{
        let data = await repository.get()
        res.status(201).send({
            data: data
        })
    }catch(erro){
        res.status(500).send({
            message: 'Falha ao carregar!',
            data: erro
        })
    }
}