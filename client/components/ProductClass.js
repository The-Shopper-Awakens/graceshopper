import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
// eslint-disable-next-line react/display-name
class Product extends React.Component {
  handleEdit() {
    const productId = this.props.match.params.productId
    this.dispatch.updateProduct(productId)
  }
  render() {
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
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProduct: productId => {
      fetchProduct(productId)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
//this needs access to the product data

//this component needs access to the product data
//receive the product data from the store
//receive the product data from
//routes.history,match,

//all products view
