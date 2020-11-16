import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {fetchItems, fetchUpdateQuantity, fetchRemoveItem} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleIncrementButton = this.handleIncrementButton.bind(this)
    this.handleDeincrementButton = this.handleDeincrementButton.bind(this)
    this.handleRemoveButton = this.handleRemoveButton.bind(this)
  }
  componentWillMount() {
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
  checkout() {
    //change isOrder to true
    //history.push(/checkout)
  }
  render() {
    const {cart} = this.props

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
                    <td id="totalAmmount">
                      $
                      {cart.reduce((total, cur) => {
                        total += cur.Order_Product.price
                        return total
                      }, 0) / (100).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="cartRight">
            <button
              type="button"
              className="checkoutButton"
              onClick={this.checkout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapCart = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchItems()),
    updateQuantity: (productId, increment) =>
      dispatch(fetchUpdateQuantity(productId, increment)),
    removeProduct: productId => dispatch(fetchRemoveItem(productId))
  }
}

export default connect(mapCart, mapDispatch)(Cart)
