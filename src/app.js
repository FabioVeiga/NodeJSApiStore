/*
    Crias as constantes do APP
 */
const express = require('express') //inicializa express
const bodyParser = require('body-parser') //transforma o onj da requisicao em JSON
const mongoose = require('mongoose') //importando mongouse
const config = require('./config')

const app = express()
const router = express.Router() //arquivo de rotas

//contecta com banco de dados
mongoose.connect(config.connectionString)

//Carregar as models
const Product = require('../src/models/product')
const Customer = require('../src/models/customer')
const Order = require('../src/models/order')

//cria variaveis para receber as rotas
const indexRoute = require('../src/routes/index-route')
const productRoute = require('../src/routes/product-route')
const customerRoute = require('../src/routes/customer-route')
const customerOrder = require('../src/routes/order-route')

//o APP ira usar a biblioteca body-parser
app.use(bodyParser.json({
    limit: '5mb' //limite do json
}))
app.use(bodyParser.urlencoded({
        extended: false
    })
) //codificando a url

//Habilita oo CORS 
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*')//liberar URLs que vao ter acesso ou mantar * para todos
    res.header('Access-Control-Allow-Headers','Origin, X-RequestedWith, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')
    next()
})

//carregar as rotas da sessao
app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', customerOrder)

module.exports = app; //expostando o app(class)