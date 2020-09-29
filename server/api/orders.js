const router = require('express').Router()
const {Order} = require('../db/models')
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

// create new order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.body.userId
    })
    await order.setUser(req.body)
  } catch (err) {
    next(err)
  }
})

// submit order
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
