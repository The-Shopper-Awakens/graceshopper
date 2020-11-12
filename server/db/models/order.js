const Sequelize = require('Sequelize')
const db = require('../db')

module.exports = db.define('Order', {
  isOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
