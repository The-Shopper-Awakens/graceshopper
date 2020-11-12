import Axios from 'axios'

const initialState = []

const SET_ITEMS = 'SET_ITEMS'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

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

export const addItem = newItem => {
  return async dispatch => {
    try {
      const {data} = await Axios.post('/api/cart', newItem) // not sure what route btw, /cart or /order
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
export const removeItem = item => {
  return async dispatch => {
    try {
      await Axios.delete(`/api/cart/${item.id}`)
      dispatch(removeItemAction(item.id))
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

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return [...state, action.item]
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.itemId)
    default:
      return state
  }
}
