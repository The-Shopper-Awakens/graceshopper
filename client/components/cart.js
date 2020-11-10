import React from 'react'
import {connect} from 'react-redux'

const Cart = props => (
  <div className="container">
    <div className="cartBox">
      <h2 id="cartTitle">Your Shopping Cart</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <td>001</td>
              <td>Boots</td>
              <td>$75</td>
              <td>1</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Tent</td>
              <td>$200</td>
              <td>1</td>
            </tr>
            <tr>
              <td>003</td>
              <td>Knit Hat</td>
              <td>$18</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div> Total: $293.00</div>
      <button>CHECKOUT</button>
    </div>
  </div>
)

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)

export default Cart
