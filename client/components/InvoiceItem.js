import React from 'react'

export default class InvoiceItem extends React.Component {
  render() {
    const {product} = this.props
    return (
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td className="qtyBox">{product.Order_Product.quantity}</td>
        <td>${(product.Order_Product.price / 100).toFixed(2)}</td>
      </tr>
    )
    // const {product} = this.props
    // const price = product.price
    // return !product.quantity ? (
    //   <div>Loading...</div>
    // ) : (
    //   <tr>
    //     <td>{product.id}</td>
    //     <td>{product.name}</td>
    //     <td className="qtyBox">{product.quantity}</td>
    //     <td>${price}</td>
    //   </tr>
    // )
  }
}
