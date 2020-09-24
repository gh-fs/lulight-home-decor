const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  subtotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
