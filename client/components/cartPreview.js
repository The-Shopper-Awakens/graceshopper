import React from 'react'
import {connect} from 'react-redux'
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

export default props => {
  return (
    <div id="cartPreviewBox">
      My Shopping Cart
      <div>
        <div>{cart.length} items in cart</div>
        <div>
          Total: $
          {cart
            .reduce((total, cur) => {
              total += cur.price
              return total
            }, 0)
            .toFixed(2)}
        </div>
      </div>
      <button type="button" className="checkoutButton">
        CHECKOUT
      </button>
    </div>
  )
}

// const mapCart = (state) => {
//   return {
//     cart: state.cart,
//   }
// }

// export default connect(mapCart, null)(CartPreview)
