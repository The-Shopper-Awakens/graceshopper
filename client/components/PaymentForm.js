import React, {useState, useEffect} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
import history from '../history'
export function PaymentForm(props) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)
  const stripe = useStripe()
  const elements = useElements()
  useEffect(() => {
    setClientSecret(props.clientSecret)
    console.log(props.clientSecret)
  })
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
  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }
  const handleSubmit = async ev => {
    ev.preventDefault()
    setProcessing(true)
    setEmail(props.email)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      // eslint-disable-next-line camelcase
      receipt_email: props.email,
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)

      await axios.get('/api/cart/checkout')
    }
  }

  return succeeded ? (
    <div>
      {history.push('/paymentSucceeded', {
        amount: props.amount,
        email: email
      })}
    </div>
  ) : (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        type="submit"
      >
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner" /> : 'Pay'}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  )
}
