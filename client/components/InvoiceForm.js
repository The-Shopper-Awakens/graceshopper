import React from 'react'
import InvoiceItem from './InvoiceItem'

export default function InvoiceForm(props) {
  let cart = props.order[0].Products
  console.log('CART', cart)
  return (
    <div className="container2">
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
                  <InvoiceItem key={idx} product={item} />
                ))}
                <tr>
                  <td />
                  <td />
                  <td id="cartTotal">Total:</td>
                  <td id="totalAmmount">
                    $
                    {(
                      cart.reduce((total, cur) => {
                        total += Number(
                          cur.Order_Product.price * cur.Order_Product.quantity
                        )
                        return total
                      }, 0) / 100
                    ).toFixed(2)}
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
