const router = require('express').Router()
const {Order, Product, Order_Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res) => {
  try {
    // const order = await Order.findOne({where: {isOrder: false}})
    // const {id} = order
    // const cart = await Order_Product.findAll({where: {OrderId: id}})

    const cart = await Order.findOne({
      where: {isOrder: false},
      include: Product
    })
    res.json(cart.Products)
  } catch (error) {
    res.sendStatus(error)
  }
})

router.post('/addProduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const [order] = await Order.findOrCreate({where: {isOrder: false}})
    const product = await Product.findByPk(productId)
    const price = product.price * 100
    const isProductInCart = await Order_Product.findOne({
      where: {ProductId: productId, OrderId: order.id}
    })
    if (isProductInCart) {
      isProductInCart.quantity += 1
      isProductInCart.price += price
      await isProductInCart.save()
    } else {
      await order.addProduct(product, {through: {price: price}})
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

router.delete('/removeProduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const isproductInCart = await Order_Product.findOne({
      where: {ProductId: productId}
    })
    await isproductInCart.destroy()

    res.json(isproductInCart)
  } catch (error) {
    res.sendStatus(error)
  }
})

router.put('/updateQuantity/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const increment = req.body.increment
    const product = await Product.findByPk(productId)
    const price = product.price * 100
    const order = await Order.findOne({where: {isOrder: false}})
    const productInCart = await Order_Product.findOne({
      where: {ProductId: productId, OrderId: order.id}
    })
    if (increment) {
      console.log(productInCart.quantity)
      productInCart.quantity += 1
      productInCart.price += price

      await productInCart.save()
    } else {
      productInCart.quantity -= 1
      productInCart.price -= price
      await productInCart.save()
    }
    if (productInCart.quantity === 0) {
      await productInCart.destroy()
      res.json(productInCart)
    } else res.json(productInCart.quantity)
  } catch (error) {
    res.sendStatus(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {isOrder: false},
      include: Product
    })
    cart.isOrder = true
    cart.save()
  } catch (error) {
    next(error)
  }
})
