const mongoose = require('mongoose')
const ValitadionContract = require('../validator/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailService = require('../services/email-services')
const authService = require('../services/auth_services')

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
            password: md5(req.body.password + global.SALT_KEY),
            roles:['user']
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

exports.authenticate = async (req, res, next) => {
    try{
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if(!customer){
            res.status(404).send({
                message: 'Usuario ou senha invalidos'
            })
            return
        }

        //mandar gerar um token
        const token = await authService.generateToken({
            //passa os dados
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })
        
        res.status(201).send({
            //vai retonar o token e os dados do usuario
            token: token,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name,
                role: customer.roles
            }
        })

    }catch(erro){
        res.status(500).send({
            message: 'Falha na sua requisicao!' ,
            data: erro
        })
    }
}

exports.refreshToken = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers['x-access-token']
        let data = await authService.decodeToken(token)

        const customer = await repository.getById(data.id)

        if(!customer){
            res.status(404).send({
                message: 'Cliente nao encontrado'
            })
            return
        }

        //mandar gerar um token
        const tokenData = await authService.generateToken({
            //passa os dados email e name
            id: customer._id,
            email: customer.email,
            name: customer.name,
            role: customer.roles
        })
        
        res.status(201).send({
            //vai retonar o token e os dados do usuario
            token: tokenData,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        })

    }catch(erro){
        res.status(500).send({
            message: 'Falha na sua requisicao!' ,
            data: erro
        })
    }
}