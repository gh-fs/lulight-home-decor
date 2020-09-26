const router = require('express').Router()
const {default: Axios} = require('axios')
const {Order, OrderHistory} = require('../db/models')
const Product = require('../db/models/product')

// get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

//get single order (get cart for logged in user)
router.get('/:userId', async (req, res, next) => {
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

//create new order
router.post('/', async (req, res, next) => {
  try {
    console.log('THIS IS REQ.BODY IN THE POST ROUTE!!!!!!', req.body)
    const order = await Order.create({
      subtotal: 0,
      userId: req.body.userId
    })
    //await order.setUser(req.body)
    if (order) {
      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})

//update order
router.put('/', async (req, res, next) => {})

module.exports = router
