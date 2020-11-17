import React from 'react'

export class GuestCheckoutCartItem extends React.Component {
  render() {
    const {product} = this.props
    const price = product.price
    return !product.quantity ? (
      <div>Loading...</div>
    ) : (
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td className="qtyBox">{product.quantity}</td>
        <td>${price}</td>
      </tr>
    )
  }
}
