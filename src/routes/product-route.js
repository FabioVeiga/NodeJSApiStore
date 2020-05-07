'use strict'

const express = require('express')
const router = express.Router()
const controllerProdutc = require('../controllers/product-controller')//importando o controlerProduct
const authService = require('../services/auth_services')

router.get('/', controllerProdutc.get)
router.get('/:slug', controllerProdutc.getBySlug) //passando slug como paramentro e deve ser o mesmo no controller
router.get('/admin/:id', controllerProdutc.getById)//para nao ter conflito com slug pq eh a mesma rota, foi colocado /admin
router.get('/tags/:tag', controllerProdutc.getByTag)//passando TAG como paramentro
router.post('/', authService.isAdmin, controllerProdutc.post) //somente pode cadastrar um produto quem tem autorizacao
router.put('/:id', authService.isAdmin, controllerProdutc.put) //passando parametro para o controller
router.delete('/', authService.isAdmin, controllerProdutc.delete)

module.exports = router;