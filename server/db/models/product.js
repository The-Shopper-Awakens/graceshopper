const Sequelize = require('Sequelize')
const db = require('../db')

const Product = db.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultProduct.png'
  },
  inventory: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
