import React from 'react'

const CartItem = props => (
  <tr>
    <td>{props.product.id}</td>
    <td>{props.product.name}</td>
    <td>{1}</td>
    <td>${props.product.price.toFixed(2)}</td>
  </tr>
)

export default CartItem
