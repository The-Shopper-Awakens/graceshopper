import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'

const cart = [
  {
    category: 'tents',
    id: 1,
    imageUrl: '/images/defaultProduct.png',
    inventory: 1,
    name: 'Tent1',
    price: 200
  },
  {
    category: 'tents',
    id: 2,
    imageUrl: '/images/defaultProduct.png',
    inventory: 3,
    name: 'Tent2',
    price: 300
  },
  {
    category: 'headwear',
    id: 3,
    imageUrl: '/images/defaultProduct.png',
    inventory: 50,
    name: 'Hat',
    price: 20
  },
  {
    category: 'footwear',
    id: 4,
    imageUrl: '/images/defaultProduct.png',
    inventory: 20,
    name: 'Boots',
    price: 150
  },
  {
    category: 'stoves',
    id: 5,
    imageUrl: '/images/defaultProduct.png',
    inventory: 5,
    name: 'Camp Stove',
    price: 100
  }
]

const Cart = props => (
  <div className="container">
    <div className="cartBox">
      <div id="cartLeft">
        <h2 id="cartTitle">Your Shopping Cart</h2>
        <div>
          <table id="cartTable">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {cart.map((item, idx) => <CartItem key={idx} product={item} />)}
              <tr>
                <td />
                <td />
                <td id="cartTotal">Total:</td>
                <td id="totalAmmount">
                  $
                  {cart
                    .reduce((total, cur) => {
                      total += cur.price
                      return total
                    }, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="cartRight">
        <button type="button" className="checkoutButton">
          CHECKOUT
        </button>
      </div>
    </div>
  </div>
)

export default Cart
