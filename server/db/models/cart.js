const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('active', 'completed', 'deleted')
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  subtotal: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Cart
