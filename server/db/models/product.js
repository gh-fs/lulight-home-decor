const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1.0
  },
  category: {
    type: Sequelize.ENUM('Shelves', 'Hooks', 'Mirrors', 'Lights'),
    allowNull: false
  },
  reviews: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
