const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdminMiddleware} = require('./gatekeeper')

// add product
router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

// edit product
router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  const productId = req.params.id
  try {
    let productToEdit = await Product.findByPk(productId)
    await productToEdit.update(req.body)
    res.json(productToEdit)
  } catch (err) {
    next(err)
  }
})

// delete product
router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  const productId = req.params.id
  try {
    await Product.destroy({
      where: {
        id: productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
