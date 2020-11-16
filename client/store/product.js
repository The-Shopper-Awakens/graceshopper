import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

const getProduct = product => {
  return {type: GET_PRODUCT, product}
}

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${product.id}`, product)
      dispatch(getProduct({}))
    } catch (err) {
      console.log(err)
    }
  }
}

export const editProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      data.price = (data.price / 100).toFixed(2)
      dispatch({type: EDIT_PRODUCT, product: data})
    } catch (err) {
      console.log(err)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    default:
      return state
  }
}
