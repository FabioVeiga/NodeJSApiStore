const mongoose = require('mongoose')
const ValitadionContract = require('../validator/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailService = require('../services/email-services')

exports.post = async (req, res, next) => {
    try{
        let contract = new ValitadionContract()
        contract.clear()
        contract.hasMinLen(req.body.name,3, 'O Nome deve conter pelo menos 3 letras')
        contract.isEmail(req.body.email, 'O Email deve ser valido')
        contract.hasMinLen(req.body.password,6, 'O senha deve conter pelo menos 6 digitos')
        
        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end()
            return
        }

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            //antes de gravar no banco de dados
            //encriptar a senha e concaternar com a varialvel global para mais seguranca
            password: md5(req.body.password + global.SALT_KEY)
        })

        //enviando email de boas vindas
        emailService.send(
            req.body.email, 
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        )
        
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        })
    }catch(erro){
        res.status(500).send({
            message: 'Falha ao cadastra sua requisicao!' ,
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