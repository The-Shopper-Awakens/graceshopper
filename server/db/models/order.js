const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
  isOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
