const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('Order_Product', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
  }
})

//create hook for price here
