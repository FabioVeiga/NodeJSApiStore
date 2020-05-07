const express = require('express')
const router = express.Router()
const controllerOrder= require('../controllers/order-controller')//importando o controler

router.post('/', controllerOrder.post)
router.get('/', controllerOrder.get)

module.exports = router;