import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {addItem} from '../store/cart' //this thunk should add the item to the cart
// eslint-disable-next-line react/display-name
class Product extends React.Component {
  constructor() {
    super()
    this.handleAddToCartButton = this.handleAddToCartButton.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }
  handleAddToCartButton(productId) {
    'invoking handleaddtocartButton'
    this.props.addItemToCart(productId)
  }
  render() {
    const product = this.props.product
    return !product.id ? (
      <div>No Product Found</div>
    ) : (
      <div className="singleProduct">
        <div>{product.name}</div>
        <div>{product.price}</div>
        <img src={product.imageUrl} />
        <button
          type="submit"
          onClick={() => this.handleAddToCartButton(product.id)}
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapProduct = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(fetchProduct(productId)),
    addItemToCart: productId => dispatch(addItem(productId))
  }
}

export default connect(mapProduct, mapDispatchToProps)(Product)
