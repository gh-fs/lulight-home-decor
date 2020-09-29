const router = require('express').Router()
const {Order} = require('../db/models')

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access denied!')
    error.status = 401
    next(error)
  }
}

const isUserMiddleware = (req, res, next) => {
  const currentUserId = req.user.id
  if (currentUserId === Number(req.params.userId)) {
    next()
  } else {
    const error = new Error('You do not have access to this cart!')
    error.status = 401
    next(error)
  }
}

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
    console.log('THIS IS REQ.BODY IN THE POST ROUTE!!!!!!', req.body)
    const order = await Order.create({
      subtotal: 0,
      userId: req.body.userId
    })
    await order.setUser(req.body)
    // if (order) {
    //   res.send(order)
    // }
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
