const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51HoKPgIPlXyRn90sC9nAJLUMz12wHug5ExAvDdvY0Ya3EimpaytSMsnzt31sHzwJ8vFp34nr5tFscmktjaJTJFUn005dxwgNr5'
)

module.exports = stripe

router.post('/createPayment', async (req, res) => {
  try {
    //req.body should include amount, currency, payment_method_types
    console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create(req.body)
    res.json({clientSecret: paymentIntent.client_secret})
  } catch (error) {
    res.sendStatus(error)
  }
})

module.exports = router
