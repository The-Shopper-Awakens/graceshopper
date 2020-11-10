import axios from 'axios'
import React from 'react'
// eslint-disable-next-line react/display-name
export default props => {
  const id = props.match.params.productId
  const product = axios.get(`api/products/${id}`) //when putting product in a try catch, it is not defined later on
  console.log(product.id)
  return !product.id ? (
    <div>No Product Found</div>
  ) : (
    <div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.imageUrl}</div>
    </div>
  )
}

//this needs access to the product data

//this component needs access to the product data
//receive the product data from the store
//receive the product data from
//routes.history,match,

//all products view
