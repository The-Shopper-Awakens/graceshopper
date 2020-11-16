const Sequelize = require('sequelize')
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
    type: Sequelize.INTEGER,
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
    defaultValue: '/images/defaultProduct.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

Product.beforeCreate(product => {
  product.price = parseInt(product.price * 100) //multiplies price by an additional factor of 10
})
//product after hook
module.exports = Product
