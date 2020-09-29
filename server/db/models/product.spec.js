const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('a product may belong to many orders', async () => {
    const orderOne = await Order.create()
    const newProductLamp = await Product.create({
      name: 'Cool lamp',
      image: 'imageHere',
      category: 'Hooks'
    })
    const newProductChair = await Product.create({
      name: 'Cool chair',
      image: 'imageHere',
      category: 'Shelves'
    })
    await orderOne.addProducts([newProductLamp, newProductChair])
    const newOrder = await orderOne.getProducts().map(product => product.name)
    expect(newOrder).to.deep.equal(['Cool lamp', 'Cool chair'])
  })

  it('an order may belong to many products', async () => {
    const newProductDesk = await Product.create({
      name: 'Cool desk',
      image: 'imageHere',
      category: 'Hooks'
    })
    const codysOrder = await Order.create({id: 10})
    const stellasOrder = await Order.create({id: 11})

    await newProductDesk.addOrders([codysOrder, stellasOrder])
    const newProduct = await newProductDesk.getOrders().map(order => order.id)
    expect(newProduct).to.deep.equal([10, 11])
  })
})
