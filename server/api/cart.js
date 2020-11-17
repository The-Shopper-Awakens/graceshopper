const router = require('express').Router()
const {Order, Product, Order_Product} = require('../db/models')
const nodemailer = require('nodemailer')
module.exports = router

router.get('/', async (req, res) => {
  try {
    // const order = await Order.findOne({where: {isOrder: false}})
    // const {id} = order
    // const cart = await Order_Product.findAll({where: {OrderId: id}})
    console.log(req.user.id)
    const cart = await Order.findOne({
      where: {isOrder: false, userId: req.user.id},
      include: Product
    })
    if (cart) {
      res.json(cart.Products)
    }
  } catch (error) {
    res.sendStatus(error)
  }
})

router.post('/guestcheckout', async (req, res, next) => {
  try {
    const order = await Order.create({isOrder: true})
    req.body.forEach(item => {
      Order_Product.create({
        quantity: item.quantity,
        price: parseInt(item.price * 100),
        OrderId: order.id,
        ProductId: item.productId
      })
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.post('/addProduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const [order] = await Order.findOrCreate({
      where: {isOrder: false, userId: req.user.id}
    })
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
    const order = await Order.findOne({
      where: {isOrder: false, userId: req.user.id}
    })

    const isproductInCart = await Order_Product.findOne({
      where: {ProductId: productId, OrderId: order.id}
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
    const order = await Order.findOne({
      where: {isOrder: false, userId: req.user.id}
    })
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

//create an error handler incase a cart doesn't exist
router.get('/checkout', async (req, res) => {
  //receiving an error when using put instead of get
  try {
    const orderToBeCheckedOut = await Order.findOne({
      where: {isOrder: false, userId: req.user.id},
      include: Product
    })

    console.log(orderToBeCheckedOut)

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'graceshoppernode@gmail.com',
        pass: 'jessetim1'
      }
    })
    let mailOptions
    req.user.email
      ? (mailOptions = {
          from: `Grace Shopper <graceshoppernode@gmail.com>`,
          to: `${req.user.email}`,
          subject: `Your order`,
          text: `You ordered: ${JSON.stringify(
            orderToBeCheckedOut.Products.map(
              item => item.Order_Product.quantity + ' x ' + item.name + ' '
            )
          )}`
        })
      : (mailOptions = {
          from: `Grace Shopper <graceshoppernode@gmail.com>`,
          to: `${window.localStorage.userInfo.email}`,
          subject: `Your order`,
          text: `You ordered: ${JSON.stringify(
            orderToBeCheckedOut.Products.map(
              item => item.Order_Product.quantity + ' x ' + item.name + ' '
            )
          )}`
        })
    transporter.sendMail(mailOptions, function(err, rest) {
      if (err) {
        console.error('there was an error: ', err)
      } else {
        console.log('here is the res: ', rest)
      }
    })

    if (orderToBeCheckedOut.Products.length > 0) {
      orderToBeCheckedOut.isOrder = true
      await orderToBeCheckedOut.save()
      await Order.create({userId: req.user.id})
      res.json(orderToBeCheckedOut)
    } else res.sendStatus(400)
  } catch (error) {
    res.sendStatus(error)
  }
})
