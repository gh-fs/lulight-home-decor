const Sequelize = require('sequelize')
const db = require('../db')

const orderHistory = db.define('orderHistory', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = orderHistory
