import React from 'react'
import {GuestCheckoutCartItem} from './index'

export function GuestCheckout(props) {
  const cart = JSON.parse(window.localStorage.getItem('order'))
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  return (
    <div className="container">
      <h2>Thanks for your order, {userInfo.email}</h2>
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
                  <GuestCheckoutCartItem key={idx} product={item} />
                ))}
                <tr>
                  <td />
                  <td />
                  <td id="cartTotal">Total:</td>
                  <td id="totalAmmount">
                    $
                    {cart
                      .reduce((total, cur) => {
                        total += Number(cur.price * cur.quantity)
                        return total
                      }, 0)
                      .toFixed(2)}
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
