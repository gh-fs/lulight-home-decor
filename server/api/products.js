const router = require('express').Router()
const {Product, OrderHistory, Order, User} = require('../db/models')

// get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// get single product
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

// add product to cart
router.put('/:id', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {userId: req.user.id, completed: false},
      include: [{all: true}]
    })
    if (existingOrder) {
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
    } else {
      const user = await User.findOne({
        where: {id: req.user.id}
      })
      const newOrder = await Order.create()
      const newProduct = await Product.findByPk(req.params.id)
      await user.addOrder(newOrder)
      await user.save()
      await newOrder.addProduct(newProduct)
      await newOrder.save()

      const orderToReturn = await Order.findOne({
        where: {userId: req.user.id, completed: false},
        include: [{all: true}]
      })
      res.json(orderToReturn)
    }
  } catch (err) {
    next(err)
  }
})

// delete product from cart
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
