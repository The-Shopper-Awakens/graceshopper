const {INTEGER} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('Order_Product', {
  quantity: INTEGER,
  price: INTEGER
})

//create hook for price here
