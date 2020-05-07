const express = require('express')
const router = express.Router()
const controllerProdutc = require('../controllers/product-controller')//importando o controlerProduct

router.get('/', controllerProdutc.get)
router.get('/:slug', controllerProdutc.getBySlug) //passando slug como paramentro e deve ser o mesmo no controller
router.get('/admin/:id', controllerProdutc.getById)//para nao ter conflito com slug pq eh a mesma rota, foi colocado /admin
router.get('/tags/:tag', controllerProdutc.getByTag)//passando TAG como paramentro
router.post('/', controllerProdutc.post)
router.put('/:id', controllerProdutc.put) //passando parametro para o controller
router.delete('/', controllerProdutc.delete)

module.exports = router;