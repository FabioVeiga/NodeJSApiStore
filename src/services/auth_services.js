'use strict'

const jwt = require('jsonwebtoken')

//gera o toke
//passando os dados que sera imputado no token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d'})
}

//desencripta o token
//recebe o token
//na variavel data tenta descodificar o token
exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY)
    return data
}
//serve como interceptador

exports.authorize = (req, res, next) => {
    //compoe o token trazendo da requisicao
    //body Token, pode vir da query, pode vir do headers
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    }else{
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if(error){
                res.status(401).json({
                    message: 'Token invalido'
                })
            }else{
                //se tudo certo, chama o next da roda
                next()
            }
        })
    }
}

//verifica se o usuario tem autorozacao
exports.isAdmin = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    }else{
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if(error){
                res.status(401).json({
                    message: 'Token invalido'
                })
            }else{
                if(decoded.roles.includes('admin')){
                    next()
                }else[
                    res.status(403).json({
                        message: 'Esta funcionalidade eh restrita para o administradores'
                    })
                ]
            }
        })
    }

}