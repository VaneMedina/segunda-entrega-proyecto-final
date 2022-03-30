const controller = require('../controllers/cartController')
const router = require('express').Router()

router.post('/', controller.post)
router.delete('/:id', controller.delete)
router.get('/:id/productos', controller.getById)
router.post('/:id/productos/:productId', controller.addProduct)
router.delete('/:id/productos/:productId', controller.deleteProduct)

module.exports = router