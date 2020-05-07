const express = require('express')
const router = express.Router()
const controllerCustomer = require('../controllers/customer-controller')//importando o controler

router.post('/', controllerCustomer.post)
router.get('/', controllerCustomer.get)

module.exports = router;