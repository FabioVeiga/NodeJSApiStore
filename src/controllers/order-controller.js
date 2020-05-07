'use strict'

const ValitadionContract = require('../validator/fluent-validator')
const repository = require('../repositories/order-repository')
const guid = require('guid')
const authService = require('../services/auth_services')

exports.post = async (req, res, next) => {
    try{
        //recuperar o token
        let token = req.body.token || req.query.token || req.headers['x-access-token']
        //Decodificar o token
        let data = await authService.decodeToken(token)

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6), //gerando guid aleatoria
            items: req.body.items
        })
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