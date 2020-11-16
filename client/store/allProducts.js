import Axios from 'axios'

const initialState = []

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//ACTION CREATORS
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

//THUNKS
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addProduct = product => {
  return async dispatch => {
    try {
      const {data} = await Axios.post('/api/products', product)
      dispatch({type: ADD_PRODUCT, product: data})
    } catch (err) {
      console.log(err)
    }
  }
}

export const editProduct = product => {
  return async dispatch => {
    try {
      const {data} = await Axios.put('/api/products', product)
      console.log(data)
      dispatch({type: EDIT_PRODUCT, product: data})
    } catch (err) {
      console.log(err)
    }
  }
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      let newState = state.map(product => {
        if (product.id === action.product.id) return action.product
      })
      return newState
    default:
      return state
  }
}
