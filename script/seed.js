'use strict'
const faker = require('faker')
const db = require('../server/db')
const {User, Product, Order_Product, Order} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'Blue Winter Hat',
      price: 20.5,
      category: 'Hats',
      imageUrl: '/images/bluewinterhat.jpg',
      inventory: 20
    }),
    Product.create({
      name: 'Leather Gloves',
      price: 10.1,
      category: 'Gloves',
      imageUrl: '/images/leathergloves.jpg',
      inventory: 10
    }),
    Product.create({
      name: "Men's Winter Boot",
      price: 30.76,
      category: 'Boots',
      imageUrl: '/images/mensboot.jpg',
      inventory: 5
    }),
    Product.create({
      name: "Men's Winter Coat",
      price: 70.1,
      category: 'Coats',
      imageUrl: '/images/menswintercoat.jpg',
      inventory: 30
    }),
    Product.create({
      name: 'Outside Work Gloves',
      price: 15.5,
      category: 'Gloves',
      imageUrl: '/images/outsideworkgloves.jpg',
      inventory: 7
    }),
    Product.create({
      name: 'Red Winter Hat',
      price: 20.79,
      category: 'Hats',
      imageUrl: '/images/redwinterhat.jpg',
      inventory: 20
    }),
    Product.create({
      name: "Women's Winter Boot",
      price: 30.55,
      category: 'Boots',
      imageUrl: '/images/womensboot.jpg',
      inventory: 5
    }),
    Product.create({
      name: "Women's Winter Coat",
      price: 70.16,
      category: 'Coats',
      imageUrl: '/images/womenswintercoat.jpg',
      inventory: 30
    })
  ])

  //generate fake product data user faker
  for (let i = 0; i < 101; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      imageUrl: faker.random.image(),
      inventory: faker.random.number()
    })
  }

  //generate fake user data using faker
  let users = []
  for (let i = 0; i < 50; i++) {
    const user = await User.create(
      {
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      {include: [Order]}
    )
    users.push(user)
  }
  users.push(
    await User.create({
      email: 'admin@gmail.com',
      password: 'admin',
      userType: 'ADMIN'
    }),
    await User.create({email: 'cody@gmail.com', password: '12345'})
  )

  //create 2 orders for every user - one order will be a cart (isOrder = false)
  let orders = []
  for (let i = 0; i < users.length; i++) {
    const order1 = await Order.create({userId: users[i].id})
    const order2 = await Order.create({userId: users[i].id, isOrder: true})
    orders.push(order1, order2)
  }

  // const cart = await Promise.all([
  //   orders[1].addProduct(products[2], {through: {price: products.price}}),
  //   orders[1].addProduct(products[5], {through: {price: products.price}}),
  //   orders[1].addProduct(products[7], {through: {price: products.price}}),
  //   orders[2].addProduct(products[2], {through: {price: products.price}}),
  // ])

  const cart = await Promise.all([
    Order_Product.create({OrderId: 1, ProductId: 2, price: products[1].price}),
    Order_Product.create({
      OrderId: 1,
      ProductId: 5,
      quantity: 2,
      price: products[4].price * 2
    }),
    Order_Product.create({OrderId: 1, ProductId: 7, price: products[6].price}),
    Order_Product.create({OrderId: 2, ProductId: 2, price: products[1].price})
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${cart.length} products in cart`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
