const router = require('express').Router()
const {Product} = require('../db/models')
const {OrderHistory} = require('../db/models')
const {Order} = require('../db/models')

// api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// api/products/id
router.get('/:id', async (req, res, next) => {
  const productId = req.params.id
  try {
    const requestedProduct = await Product.findByPk(productId)
    if (!requestedProduct) {
      res.sendStatus(404)
    }
    res.json(requestedProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {userId: req.user.id, completed: false},
      include: [{all: true}]
    })

    const productAlreadyInCart = await OrderHistory.findOne({
      where: {
        productId: req.params.id,
        orderId: existingOrder.id
      }
    })

    if (productAlreadyInCart) {
      await productAlreadyInCart.update({
        quantity: productAlreadyInCart.quantity + 1
      })
      await existingOrder.reload()
    } else {
      const newProduct = await Product.findByPk(req.params.id)
      await existingOrder.addProduct(newProduct)
      await existingOrder.reload()
    }

    res.json(existingOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {userId: req.user.id, completed: false},
      include: [{all: true}]
    })

    await OrderHistory.destroy({
      where: {
        productId: req.params.id,
        orderId: existingOrder.id
      }
    })

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
