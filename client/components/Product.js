import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
// eslint-disable-next-line react/display-name
class Product extends React.Component {
  // handleEdit() {
  //   const productId = this.props.match.params.productId
  //   this.dispatch.updateProduct(productId)
  // }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }
  handleAddToCart() {}
  render() {
    const product = this.props.product
    return !product.id ? (
      <div>No Product Found</div>
    ) : (
      <div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <img src={product.imageUrl} />
        <button type="submit">Add To Cart</button>
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
    getProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
