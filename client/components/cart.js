import React from 'react'
import {connect} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import {CheckoutForm} from '.'
const promise = loadStripe(
  'pk_test_51HoKPgIPlXyRn90sj4konby739jd6RRYkOAJl6PYyqP8e2qNHwub3jLkn7X1lvL47iZqUv1niX39R8d6tG4Av9XA00MS9wXW1O'
)

import {
  fetchItems,
  fetchUpdateQuantity,
  fetchRemoveItem,
  fetchCheckoutAction
} from '../store/cart'
import {fetchPaymentIntent} from '../store/payment'

import CartItem from './cartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {proceedToCheckout: false}
    this.handleIncrementButton = this.handleIncrementButton.bind(this)
    this.handleDeincrementButton = this.handleDeincrementButton.bind(this)
    this.handleRemoveButton = this.handleRemoveButton.bind(this)
    this.handle = this.handleCheckout.bind(this)
    this.handleProceedToPaymentButton = this.handleProceedToPaymentButton.bind(
      this
    )
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleIncrementButton(productId, increment) {
    this.props.updateQuantity(productId, increment)
  }

  handleDeincrementButton(productId, increment) {
    this.props.updateQuantity(productId, increment)
  }
  handleRemoveButton(productId) {
    this.props.removeProduct(productId)
  }
  async handleCheckout(totalAmount) {
    // totalAmount = (totalAmount * 100).toFixed(0)
    // const {data} = await axios.post('/api/payments/createPayment', {
    //   amount: totalAmount,
    //   currency: 'usd',
    // })
    // this.props.history.push('/paymentForm', {clientSecret: data.clientSecret})
    // this.props.()
    // const {data} = await axios.get('/api/cart/checkout')
    // this.props.history.push('/checkout', {data: data})
    this.props.checkout()
  }
  handleProceedToPaymentButton(totalAmount) {
    totalAmount *= 100
    this.props.generatePaymentIntent(totalAmount)
    this.setState({proceedToCheckout: true})
  }
  render() {
    let bool = true
    const {cart} = this.props
    const totalAmount =
      cart.reduce((total, cur) => {
        total += cur.Order_Product.price
        return total
      }, 0) / (100).toFixed(2)
    return (
      <div className="container">
        <div className="cartBox">
          <div id="cartLeft">
            <h2 id="cartTitle">Your Shopping Cart</h2>
            <div>
              <table id="cartTable">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {cart.map((item, idx) => (
                    <CartItem
                      key={idx}
                      product={item}
                      handleIncrementButton={this.handleIncrementButton}
                      handleDeincrementButton={this.handleDeincrementButton}
                      handleRemoveButton={this.handleRemoveButton}
                    />
                  ))}
                  <tr>
                    <td />
                    <td />
                    <td id="cartTotal">Total:</td>
                    <td id="totalAmount">${totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="cartRight">
            <button
              type="submit"
              className="checkoutButton"
              onClick={() => this.handleProceedToPaymentButton(totalAmount)}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
        {this.state.proceedToCheckout ? (
          <CheckoutForm
            clientSecret={this.props.clientSecret}
            amount={totalAmount}
          />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapCart = state => {
  return {
    cart: state.cart,
    clientSecret: state.payment
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchItems()),
    updateQuantity: (productId, increment) =>
      dispatch(fetchUpdateQuantity(productId, increment)),
    removeProduct: productId => dispatch(fetchRemoveItem(productId)),
    checkout: () => dispatch(fetchCheckoutAction()),
    generatePaymentIntent: amount => dispatch(fetchPaymentIntent(amount))
  }
}

export default connect(mapCart, mapDispatch)(Cart)
