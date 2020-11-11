const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res) => {
  try {
    const id = req.params.productId
    const product = await Product.findByPk(id)
    res.json(product)
  } catch (error) {
    res.sendStatus(error)
  }
})

//two ways of doing this - first way create a route that is linked to products - clicking on a link should prodive the correct ID which will be put into the axios url
//second way is to create a separate link to each product without :productId and send the id as a req in axios
