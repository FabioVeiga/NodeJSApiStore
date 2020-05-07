'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/customer-controller')//importando o controler
const authService = require('../services/auth_services')


router.post('/', controller.post)
router.post('/authenticate', controller.authenticate) //autentica usuario
router.post('/refresh-token', authService.authorize, controller.refreshToken)
router.get('/', controller.get)


module.exports = router