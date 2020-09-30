const router = require('express').Router()
const {Order, Product, OrderHistory} = require('../db/models')
const {isAdminMiddleware, isUserMiddleware} = require('./gatekeeper')

// get all orders
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

// get single order - the cart for logged in user
router.get('/:userId', isUserMiddleware, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, completed: false},
      include: [{all: true}]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

// create new order - for guest checkout
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({completed: true})

    let products = req.body

    products.forEach(async product => {
      if (product.quantity > 0) {
        await OrderHistory.create({
          productId: product.productId,
          orderId: order.id,
          quantity: product.quantity
        })
      }
    })

    await order.reload()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// submit order - for logged in user
router.put('/:userId', isUserMiddleware, async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false},
      include: [{all: true}]
    })
    await currentOrder.update({completed: true})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
