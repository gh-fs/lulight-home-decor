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
  //req.body is empty
  console.log('inside express route!!!!!!', req.user.id)
  try {
    const order = await Order.findOne({
      where: {userId: req.user.id},
      // include: {model: OrderHistory},
      include: [{all: true}]
    })
    // console.log(order)
    const orderProduct = await OrderHistory.findOne({
      where: {
        productId: req.params.id,
        orderId: order.id
      }
    })
    console.log('order product', orderProduct)
    if (orderProduct) {
      await orderProduct.update({
        quantity: orderProduct.quantity + 1
      })
      res.json(orderProduct)
    } else {
      console.log('create new row for order history')
      // const newOrderProduct = await OrderHistory.create({
      //   orderId: req.body.orderId,
      //   productId: req.params.id,
      //   quantity: 1,
      // })
      const selectProduct = await Product.findByPk(req.params.id)
      await order.addProduct(selectProduct)
      await order.reload()
      res.json(selectProduct)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
