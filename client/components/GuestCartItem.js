import React from 'react'

class GuestCartItem extends React.Component {
  constructor() {
    super()
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleIncrement() {
    //if qty + 1 < invenetory, don't increment and shjow a message that says
    //"We only have {inventory} of this product in stock."
    let cartData = JSON.parse(window.localStorage.getItem('cart'))
    cartData.forEach(product => {
      if (product.productId === this.props.product.productId) product.quantity++
    })
    window.localStorage.setItem('cart', JSON.stringify(cartData))
    this.props.renderCart()
  }

  handleDecrement() {
    //if qty - 1 < 0, don't decrement
    let cartData = JSON.parse(window.localStorage.getItem('cart'))
    cartData.forEach(product => {
      if (
        product.productId === this.props.product.productId &&
        product.quantity !== 0
      )
        product.quantity--
    })
    window.localStorage.setItem('cart', JSON.stringify(cartData))
    this.props.renderCart()
  }

  handleRemove() {
    let cartData = JSON.parse(window.localStorage.getItem('cart'))
    cartData = cartData.filter(
      product => product.productId !== this.props.product.productId
    )
    window.localStorage.setItem('cart', JSON.stringify(cartData))
    this.props.renderCart()
  }

  render() {
    const product = this.props.product
    return (
      <tr>
        <td>{product.productId}</td>
        <td>{product.name}</td>
        <td className="qtyBox">
          {product.quantity}
          <span className="cartButtons">
            <div className="upAndDown">
              <button
                className="incrementQty"
                type="button"
                onClick={this.handleIncrement}
              />
              <button
                className="decrementQty"
                type="button"
                onClick={this.handleDecrement}
              />
            </div>
            <button
              className="removeProduct"
              type="button"
              onClick={this.handleRemove}
            >
              x
            </button>
          </span>
        </td>
        <td>
          ${(this.props.product.price * this.props.product.quantity).toFixed(2)}
        </td>
      </tr>
    )
  }
}

export default GuestCartItem
