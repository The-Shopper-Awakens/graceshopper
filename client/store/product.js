import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'

const getProduct = store => {
  return {type: GET_PRODUCT, store}
}

export const fetchProduct = dispatch => {
  return async productId => {
    try {
      const product = await axios.get(`/api/products/:${productId}`)
      dispatch(getProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.store
    default:
      return state
  }
}
