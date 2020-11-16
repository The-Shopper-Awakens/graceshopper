import React from 'react'


class CartPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  //How do we listen to local storage so that changes in local storage prompt a change in state?

  componentDidMount() {
    let cart = JSON.parse(window.localStorage.getItem('cart')) || []
    this.setState({
      cart: cart
    })
  }

  render() {
    return (
      <div id="cartPreviewBox">
        My Shopping Cart
        <div>
          {this.state.cart.length ? (
            <div>
              {this.state.cart.reduce((total, cur) => {
                return (total += cur.qty)
              }, 0)}{' '}
              items in cart
            </div>
          ) : (
            <div>0 items in cart</div>
          )}
          <div>
            Total: $
            {this.state.cart.length
              ? this.state.cart
                  .reduce((total, cur) => {
                    total += cur.price * cur.qty
                    return total
                  }, 0)
                  .toFixed(2)
              : 0}
          </div>
        </div>
        <button type="button" className="checkoutButton">
          CHECKOUT
        </button>
      </div>
    )
  }
}
export default CartPreview
