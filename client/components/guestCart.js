import React from 'react'
import GuestCartItem from './guestCartItem'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.renderCart = this.renderCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
  }

  renderCart() {
    this.setState({
      cart: JSON.parse(window.localStorage.getItem('cart'))
    })
  }

  clearCart() {
    window.localStorage.setItem('cart', JSON.stringify([]))
    this.renderCart()
  }

  componentDidMount() {
    let cart = JSON.parse(window.localStorage.getItem('cart')) || []
    this.setState({
      cart: cart
    })
  }

  render() {
    return (
      <div className="container">
        <div className="cartBox">
          <div id="cartLeft">
            {this.state.cart.length ? (
              <h2 id="cartTitle">Your Shopping Cart</h2>
            ) : (
              <h2 id="cartTitle">Your Shopping Cart is Empty</h2>
            )}
            <div>
              <table id="cartTable">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                  {this.state.cart.map((item, idx) => (
                    <GuestCartItem
                      key={idx}
                      product={item}
                      renderCart={this.renderCart}
                    />
                  ))}
                  <tr>
                    <td />
                    <td />
                    <td id="cartTotal">Total:</td>
                    <td id="totalAmmount">
                      $
                      {this.state.cart
                        .reduce((total, cur) => {
                          total += cur.price * cur.qty
                          return total
                        }, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="cartRight">
            <button type="button" className="checkoutButton">
              CHECKOUT
            </button>
            <button
              type="button"
              className="checkoutButton"
              onClick={this.clearCart}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default GuestCart
