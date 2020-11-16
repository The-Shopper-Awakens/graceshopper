const {array} = require('prop-types')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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

  product.price = parseInt(product.price * 100, 10)
})

Product.afterFind(products => {
  if (Array.isArray(products)) {
    products.map(product => {
      product.price = (product.price / 100).toFixed(2)
    })
  } else products.price = (products.price / 100).toFixed(2)
})

module.exports = Product
