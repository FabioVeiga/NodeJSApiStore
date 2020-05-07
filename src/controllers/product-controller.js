
/**
 * Impostando
 * Bibliotecas 
 * *models
 * *Plugins
 */
const mongoose = require('mongoose')
const ValitadionContract = require('../validator/fluent-validator')
const repository = require('../repositories/product-repository')

exports.get = async(req, res, next) => { //assinala com async
    //tratar tudo dentro de um try cathc caso erro
    try{//tente
        let data = await repository //cria variavel para receber await do repositorio
        .get() //executa
        res.status(200).send(data) //retorna
    } catch (erro){// se erro retorno http 500
        res.status(500).send({
            message: "Falha ao processar sua requisicao"
        })
    }
}

//Get by slug
exports.getBySlug = async(req, res, next) => {
    try{
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    }catch(erro){
        
    }
}

//get by ID
exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id)//passando paramentro id 
        res.status(200).send(data)
    }catch(erro){
        
    }
}

//get by TAG
exports.getByTag = async (req, res, next) =>{
    try{
        let data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    }catch(erro){
        res.status(500).send(erro)
    }
}

/**
 * manter uma rota para parazer todo o crud
 * somente alterar o metodo
 * paramentros
 * *req = request (requisicao) toda requisicao tem uma resposta
 * *res = response (resposta)
 * *next = seguir para proximo evento
 */
//exportando diretamente
//POST to SAVE
exports.post = async (req, res, next) => {
    //Usando o methodo de validar dado
    let contract = new ValitadionContract()
    contract.hasMinLen(req.body.title,3, 'O titulo deve conter pelo menos 3 letras')
    contract.hasMinLen(req.body.slug,3, 'O slug deve conter pelo menos 3 letras')
    contract.hasMinLen(req.body.description,3, 'O description deve conter pelo menos 3 letras')
    
    //se os dados forem invalidos
    if(!contract.isValid()){
        //retorna um bad request
        //contract errors devolve toodos os erros encontrados
        res.status(400).send(contract.errors()).end()
        //returno para nao continuar 
        return
    }
    try{
        let data = await repository.create(req.body)
        //se tudo OK
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        })
    }catch(erro){
        res.status(400).send({
            message: 'Falha ao cadastra o produto!' ,
            data: erro
        })
    }
}

/**
 * Exemplo PUT
    exports.put = (req, res, next) => {
        let id = req.params.id //recuperando o paramentro
        res.status(201).send({ 
            id: id,
            item: req.body
        })
    }
 */

//Update usando PUT
exports.put = async(req, res, next) => {
    try{
        let data = await repository.update(req.params.id, req.body) //passando para o reppositorio
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        })
    }catch(erro){
        res.status(400).send({
            message: 'Falha ao atualizar o produto!',
            data: erro
        })
    }
}

exports.delete = async (req, res, next) => {
    try{
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        })
    }catch(erro){
        res.status(400).send({
            message: 'Falha ao remover o produto!',
            data: erro
        })
    }
}
