import React from 'react'
import {CheckoutCartItem} from './index'
export function Checkout(props) {
  let cart
  props.location.state
    ? (cart = props.location.state.data.Products)
    : (cart = [])

  return (
    <div className="container">
      <div className="cartBox">
        <div id="cartLeft">
          <h2 id="cartTitle">Invoice</h2>
          <div>
            <table id="cartTable">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>

                {cart.map((item, idx) => (
                  <CheckoutCartItem key={idx} product={item} />
                ))}
                <tr>
                  <td />
                  <td />
                  <td id="cartTotal">Total:</td>
                  <td id="totalAmmount">
                    $
                    {cart.reduce((total, cur) => {
                      total += cur.Order_Product.price
                      return total
                    }, 0) / (100).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// class Cart extends React.Component {

//   render() {
//     return (
//       <div className="container">
//         <div className="cartBox">
//           <div id="cartLeft">
//             <h2 id="cartTitle">Your Shopping Cart</h2>
//             <div>
//               <table id="cartTable">
//                 <tbody>
//                   <tr>
//                     <th>ID</th>
//                     <th>Product</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                   </tr>
//                   {cart.map((item, idx) => (
//                     <CartItem key={idx} product={item} />
//                   ))}
//                   <tr>
//                     <td />
//                     <td />
//                     <td id="cartTotal">Total:</td>
//                     <td id="totalAmmount">
//                       $
//                       {cart.reduce((total, cur) => {
//                         total += cur.Order_Product.price
//                         return total
//                       }, 0) / (100).toFixed(2)}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
// //           <div id="cartRight">
// //             <button
//               type="button"
//               className="checkoutButton"
//               onClick={this.checkout}
//             >
//               CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// const mapCart = (state) => {
//   return {
//     cart: state.cart,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getCart: () => dispatch(fetchItems()),
//     updateQuantity: (productId, increment) =>
//       dispatch(fetchUpdateQuantity(productId, increment)),
//     removeProduct: (productId) => dispatch(fetchRemoveItem(productId)),
//   }
// }

// export default connect(mapCart, mapDispatch)(Cart)
