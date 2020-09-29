const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  beforeEach(() => {
    return Promise.all([
      Product.create(
        {
          id: 1,
          name: 'cool sofa',
          image: '/images/r2d2.png',
          category: 'Hooks'
        },
        Product.create({
          id: 2,
          name: 'cool pillow',
          image: '/images/walle.jpeg',
          category: 'Mirrors'
        })
      )
    ])
  })

  it('GET /api/products responds with all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal('cool pillow')
  })
})
