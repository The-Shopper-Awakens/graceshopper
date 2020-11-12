const router = require('express').Router()
const {Sequelize} = require('sequelize')
const {Order, Product, Order_Product} = require('../db/models')
module.exports = router
router.post('/addProduct', async (req, res) => {
  try {
    const productId = req.body.productId
    const [order] = await Order.findOrCreate({where: {isOrder: false}})
    const product = await Product.findByPk(productId)
    const isProductInCart = await Order_Product.findOne({
      where: {ProductId: productId}
    })
    if (isProductInCart) {
      isProductInCart.quantity += 1
      isProductInCart.price += price
      await isProductInCart.save()
    } else {
      await order.addProduct(product, {through: {price: product.price}})
    }

    const cart = await Order.findOne({
      where: {isOrder: false},
      include: Product
    })
    res.json(product)
  } catch (error) {
    res.sendStatus(error)
  }
})

router.post('/removeProduct', async (req, res) => {
  try {
    const productId = req.body.productId
    const isproductInCart = await Order_Product.findOne({
      where: {ProductId: productId}
    })
    await isproductInCart.destroy()

    res.json(isproductInCart)
  } catch (error) {
    res.sendStatus(error)
  }
})

//find whether the order has been created or not - if not created, create the new order
//add the product

//if quantity already exists
//if the
