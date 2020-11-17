import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {useElements, CardElement} from '@stripe/react-stripe-js' // eslint-disable-next-line react/display-name

const stripe = loadStripe(
  'pk_test_51HoKPgIPlXyRn90sj4konby739jd6RRYkOAJl6PYyqP8e2qNHwub3jLkn7X1lvL47iZqUv1niX39R8d6tG4Av9XA00MS9wXW1O'
)

//Pass the resulting promise from loadStripe to the Elements provider.
//This allows the child components to access the Stripe service via the Elements consumer.
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

export class Payment extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handleSubmit(eve) {
    eve.preventDefault()
    const payload = await stripe.confirmCardPayment(this.props.clientSecret, {
      payment_method: {
        card: element.getElement(eve.target.cardnum.value)
      }
    })
    console.log(payload)
  }
  handleChange(eve) {
    console.log(eve.target.value)
  }
  render() {
    const succeeded = true
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fullname"> Full Name</label>
          <input type="text" placeholder="John M. Doe" />
          <label htmlFor="email"> Email</label>
          <input type="text" placeholder="john@example.com" />
          <label htmlFor="address"> Address</label>
          <input type="text" placeholder="542 W. 15th Street" />
          <label htmlFor="city">City</label>
          <input type="text" placeholder="New York City" />
          <label htmlFor="state">State</label>
          <input type="text" placeholder="New York" />
          <label htmlFor="zip">Zip Code</label>
          <input type="text" placeholder="10001" />
          <label htmlFor="cardname">Name on Card</label>
          <input type="text" placeholder="John  Doe" />
          <label htmlFor="cardnum">Credit card number</label>
          <input
            type="text"
            placeholder="1111 2222 3333 4444"
            name="cardnum"
            onChange={this.handleChange}
          />
          <label htmlFor="expmonth">Exp Month</label>
          <input type="text" placeholder="September" />
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={this.handleChange}
          />

          <button type="submit" name="paymentButton">
            Pay for Stuff
          </button>
          <p className={succeeded ? 'result-message' : 'result-message-hidden'}>
            Payment Succeeded
          </p>
        </form>
      </div>
    )
  }
}

//require paymentSucceeded, clientSecret,
