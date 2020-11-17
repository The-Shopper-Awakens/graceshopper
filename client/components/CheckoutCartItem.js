import React from 'react'

export class CheckoutCartItem extends React.Component {
  render() {
    const {product} = this.props
    const price = (product.Order_Product.price / 100).toFixed(2)
    return !product.Order_Product.quantity ? (
      <div>Loading...</div>
    ) : (
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td className="qtyBox">{product.Order_Product.quantity}</td>
        <td>${price}</td>
      </tr>
    )
  }
}
