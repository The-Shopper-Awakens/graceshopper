const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51HoKPgIPlXyRn90sC9nAJLUMz12wHug5ExAvDdvY0Ya3EimpaytSMsnzt31sHzwJ8vFp34nr5tFscmktjaJTJFUn005dxwgNr5'
)

module.exports = stripe
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

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
// router.post('/confirmPayment', async (req, res) => {
//   try {
//     const confirmPI = await stripe.paymentIntents.confirm(req.body)
//     res.json(confirmPI)
//   } catch (error) {
//     res.sendStatus(error)
//   }
// })

// router.post('/capturePayment', async (req, res) => {
//   try {
//     const capturePI = await stripe.paymentIntents.capture(req.body)
//     res.json(capturePI)
//   } catch (error) {
//     res.sendStatus(error)
//   }
// })
module.exports = router
