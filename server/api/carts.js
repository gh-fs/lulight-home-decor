const router = require('express').Router()
const {default: Axios} = require('axios')
const {Order} = require('../db/models')

//create new order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
      status: 'active',
      subtotal: 0,
      userId: req.body.id
    })
    if (order) {
      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})
