const express = require('express')
const router = express.Router()
const controllerOrder= require('../controllers/order-controller')//importando o controler
const authService = require('../services/auth_services')

router.post('/', authService.authorize, controllerOrder.post)
router.get('/', authService.authorize, controllerOrder.get)

module.exports = router;