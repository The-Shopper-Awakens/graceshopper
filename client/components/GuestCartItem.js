import {render} from 'enzyme'
import React from 'react'

class GuestCartItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.id}</td>
        <td>{this.props.product.name}</td>
        <td className="qtyBox">
          {1}
          <span className="cartButtons">
            <div className="upAndDown">
              <button className="incrementQty" type="button" />
              <button className="decrementQty" type="button" />
            </div>
            <button className="removeProduct" type="button">
              x
            </button>
          </span>
        </td>
        <td>${this.props.product.price.toFixed(2)}</td>
      </tr>
    )
  }
}
export default GuestCartItem
