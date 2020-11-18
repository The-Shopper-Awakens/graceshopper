import React from 'react'

class CartItem extends React.Component {
  componentDidMount() {}
  render() {
    const {product} = this.props
    const price = (product.Order_Product.price / 100).toFixed(2)
    return !product.Order_Product.quantity ? (
      <div>Loading...</div>
    ) : (
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td className="qtyBox">
          {product.Order_Product.quantity}
          <span className="cartButtons">
            <div className="upAndDown">
              <button
                className="incrementQty"
                type="button"
                onClick={() => {
                  this.props.handleIncrementButton(product.id, true)
                }}
              >
                +
              </button>
              <button
                className="decrementQty"
                type="button"
                onClick={() => {
                  this.props.handleDeincrementButton(product.id, false)
                }}
              >
                -
              </button>
            </div>
            <button
              className="removeProduct"
              type="button"
              onClick={() => {
                this.props.handleRemoveButton(product.id)
              }}
            >
              x
            </button>
          </span>
        </td>
        <td>${price}</td>
      </tr>
    )
  }
}

export default CartItem
