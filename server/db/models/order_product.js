const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('Order_Product', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order_Product
//create hook for price here
