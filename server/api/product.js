const router = require('express').Router()
const {Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (req.user.userType === 'ADMIN') {
    try {
      const existingProduct = await Product.findOne({
        where: {
          name: req.body.name
        }
      })
      if (existingProduct === null) {
        const createdProduct = await Product.create(req.body)
        res.status(201).send(createdProduct)
      } else {
        res.sendStatus(409)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(404)
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

router.delete('/:productId', async (req, res, next) => {
  if (req.user.userType === 'ADMIN') {
    try {
      if (!Number.isInteger(parseInt(req.params.productId))) {
        res.sendStatus(400)
      }
      const deleted = await Product.findOne({
        where: {
          id: parseInt(req.params.productId)
        }
      })
      if (deleted) {
        await Product.destroy({
          where: {
            id: parseInt(req.params.productId)
          }
        })
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(404)
  }
})

router.put('/:productId', async (req, res, next) => {
  if (req.user.userType === 'ADMIN') {
    try {
      const updatedProduct = await Product.findOne({
        where: {
          id: req.params.productId
        }
      })
      if (updatedProduct) {
        await updatedProduct.update(req.body)
        res.status(200).send(updatedProduct)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(404)
  }
})

//two ways of doing this - first way create a route that is linked to products - clicking on a link should prodive the correct ID which will be put into the axios url
//second way is to create a separate link to each product without :productId and send the id as a req in axios
