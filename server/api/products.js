const router = require('express').Router()
const {Product} = require('../db/models')

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

module.exports = router
