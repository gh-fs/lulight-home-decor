'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'DARK WALNUT Bathroom Mirror, Rustic Wood',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1411971502_lt24-768x1024.jpg',
      inventory: 7,
      price: 160,
      category: 'Mirrors',
      reviews: ''
    }),
    Product.create({
      name: 'EBONY Mirror, Wood Frame, Farmhouse, Vanity, Entryway Mirror',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1952446239_kh3t-768x768.jpg',
      inventory: 35,
      price: 187,
      category: 'Mirrors',
      reviews: ''
    }),
    Product.create({
      name:
        'Coat Rack, Simple Coat Hooks, Farmhouse Towel Rack, Modern Rustic Industrial Handmade Hallway Entryway bathroom Hooks, Wall Mounted Hanger',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1750820684_9ujr-768x768.jpg',
      inventory: 7,
      price: 59,
      category: 'Hooks',
      reviews: ''
    }),
    Product.create({
      name:
        'Rustic, Industrial Pipe Towel Hook, Towel Holder, Pipe Rack, Galvanized Pipe Hook, Entryway Coat Purse Organizer, Storage Hooks, Lulight',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1838018577_jbjn-768x576.jpg',
      inventory: 17,
      price: 24,
      category: 'Hooks',
      reviews: ''
    }),
    Product.create({
      name:
        'ESPRESSO Wall Hooks, Rustic Pipe Rack, Coat Hooks, Decorative Wall Hooks, Hooks on Wood, Towel Rack, Best Selling Items Wood, Hooks, Rack',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1776338284_l6bc-768x576.jpg',
      inventory: 34,
      price: 67,
      category: 'Hooks',
      reviews: ''
    }),
    Product.create({
      name:
        'WHITEWASH 5.5" Deep/1.5" Thick Shelves, Bathroom White Shelf, Kitchen White Shelf, Floating White Shelf, Wood Shelf, Shelf on Pipe Brackets',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.2023660545_8mrr-768x576.jpg',
      inventory: 43,
      price: 19,
      category: 'Shelves',
      reviews: ''
    }),
    Product.create({
      name:
        'Towel Bar with Shelf and Extra Floating Shelf, Industrial, Modern, Rustic Towel Holder, Bathroom Shelf, Bathroom Decor, Shelves',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1799985487_xoaf-768x656.jpg',
      inventory: 25,
      price: 93,
      category: 'Shelves',
      reviews: ''
    }),
    Product.create({
      name:
        'Small Farmhouse Industrial Wall Shelf, Gray Whitewash Shelf, Small Floating Shelf, Pipe Shelf, Lulight, Rustic Modern Handmade Wall Shelf',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1799416707_31ce-768x548.jpg',
      inventory: 23,
      price: 35,
      category: 'Shelves',
      reviews: ''
    }),
    Product.create({
      name:
        'RECLAIMED WOOD Vanity Light Fixture, 4 Cages Light Fixture, Light With Shade, Wall Light, Pendant Light, Bathroom Rustic Industrial Lights',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1809648891_44dj-768x566.jpg',
      inventory: 8,
      price: 230,
      category: 'Lights',
      reviews: ''
    }),
    Product.create({
      name:
        'RUSTIC DISTRESSED mason jar light fixture, 3 mason jars light, industrial lights, modern light, vanity light, wall fixture, bathroom light',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1763386718_d9bb-768x457.jpg',
      inventory: 27,
      price: 190,
      category: 'Lights',
      reviews: ''
    }),
    Product.create({
      name:
        'Kitchen Chandelier, Farmhouse Decor, Pendant Lighting, Wood Light, Lulight Kitchen Light, Dining Room Light, Wood Fixture, Flush Mount Light',
      image:
        'https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1761029854_gi9o-768x455.jpg',
      inventory: 27,
      price: 230,
      category: 'Lights',
      reviews: ''
    })
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
