const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('active', 'completed', 'deleted')
  },
  subtotal: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Order
