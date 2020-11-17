import Axios from 'axios'

const initialState = []

const SET_ITEMS = 'SET_ITEMS'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CHECKOUT = 'CHECKOUT'
export const setItems = items => {
  return {
    type: SET_ITEMS,
    items
  }
}

/*
For addItem, I'm not sure how we want to set up the quantity.
Do we want it so that every time they add 1 more quantity of the item,
it calls addItem again?
or do we want it that the reducer supports adding multiple items at a time,
not sure how to implement the second one although it SEEMs better but idk.
*/

export const addItemAction = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const checkout = cart => {
  return {type: CHECKOUT, cart}
}

export const addItem = productId => {
  return async dispatch => {
    try {
      console.log(productId)
      const {data} = await Axios.post(`/api/cart/addProduct/${productId}`)
      dispatch(addItemAction(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// Similar question to above, support removing multiple quantities simultaneously?

export const removeItemAction = itemId => {
  return {
    type: REMOVE_ITEM,
    itemId
  }
}

const updateQuantity = cart => {
  return {
    type: UPDATE_QUANTITY,
    cart
  }
}

export const fetchUpdateQuantity = (productId, increment) => {
  return async dispatch => {
    await Axios.put(`/api/cart/updateQuantity/${productId}`, {
      increment
    })
    const {data} = await Axios.get(`/api/cart`)
    dispatch(updateQuantity(data))
  }
}
export const fetchRemoveItem = productId => {
  return async dispatch => {
    try {
      await Axios.delete(`/api/cart/removeProduct/${productId}`)
      dispatch(removeItemAction(productId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getTotalQuantity = () => {
  return async () => {
    try {
      const {data} = await Axios.get('/api/cart')
      let quant = 0
      data.map(item => quant + item.Order_Product.quantity)
      return quant
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchItems = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/cart')
      dispatch(setItems(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCheckoutAction = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.put('/api/cart/checkout')
      dispatch(checkout(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return state //addItem does not need to return anything
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.itemId)
    case UPDATE_QUANTITY:
      return action.cart
    case CHECKOUT:
      return action.cart
    default:
      return state
  }
}
