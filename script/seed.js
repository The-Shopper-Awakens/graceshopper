'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const products = await Promise.all([
    Product.create({
      name: 'Blue Winter Hat',
      price: 20.5,
      category: 'Hats',
      imageUrl: '../public/images/bluewinterhat.jpg',
      inventory: 20
    }),
    Product.create({
      name: 'Leather Gloves',
      price: 10.1,
      category: 'Gloves',
      imageUrl: '../public/images/leathergloves.jpg',
      inventory: 10
    }),
    Product.create({
      name: "Men's Winter Boot",
      price: 30.76,
      category: 'Boots',
      imageUrl: '../public/images/mensboot.jpg',
      inventory: 5
    }),
    Product.create({
      name: "Men's Winter Coat",
      price: 70.1,
      category: 'Coats',
      imageUrl: '../public/images/menswintercoat.jpg',
      inventory: 30
    }),
    Product.create({
      name: 'Outside Work Gloves',
      price: 15.5,
      category: 'Gloves',
      imageUrl: '../public/images/outsideworkgloves.jpg',
      inventory: 7
    }),
    Product.create({
      name: 'Red Winter Hat',
      price: 20.79,
      category: 'Hats',
      imageUrl: '../public/images/redwinterhat.jpg',
      inventory: 20
    }),
    Product.create({
      name: "Women's Winter Boot",
      price: 30.55,
      category: 'Boots',
      imageUrl: '../public/images/womensboot.jpg',
      inventory: 5
    }),
    Product.create({
      name: "Women's Winter Coat",
      price: 70.16,
      category: 'Coats',
      imageUrl: '../public/images/womenswintercoat.jpg',
      inventory: 30
    })
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
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
