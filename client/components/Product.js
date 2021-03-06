import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import EditProduct from './EditProduct'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {addItem} from '../store/cart' //this thunk should add the item to the cart
// eslint-disable-next-line react/display-name
class Product extends React.Component {
  constructor() {
    super()

    this.handleAddToLocalStorage = this.handleAddToLocalStorage.bind(this)
    this.handleAddToCartButton = this.handleAddToCartButton.bind(this)
  }
  // handleEdit() {
  //   const productId = this.props.match.params.productId
  //   this.dispatch.updateProduct(productId)
  // }

  handleAddToLocalStorage() {
    //if cart exists in local storage, add to it, if not, create the cart
    toast.success('Added to cart!')
    let product = this.props.product
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    if (!cart)
      window.localStorage.setItem(
        'cart',
        JSON.stringify([
          {
            productId: product.id,
            name: product.name,
            quantity: 1,
            price: product.price
          }
        ])
      )
    else if (
      !cart.reduce((bool, item) => {
        return item.productId === product.id || bool
      }, false)
    ) {
      cart.push({
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price
      })
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart.forEach(item => {
        if (item.productId === product.id) item.quantity++
      })
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  handleAddToCart() {}

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  handleAddToCartButton(productId) {
    'invoking handleaddtocartButton'
    toast.success('Added to cart!')
    this.props.addItemToCart(productId)
  }

  render() {
    const product = this.props.product
    return !product.id ? (
      <div className="container">
        <h1>No Product Found</h1>
      </div>
    ) : (
      <div className="APcontainer">
        <div className="container">
          <div className="singleProduct">
            <div className="SPLeft">
              <img className="singleProductImg" src={product.imageUrl} />
            </div>
            <div className="SPRight">
              <h2>{product.name}</h2>
              <h2>Price: ${product.price}</h2>
              <div>
                <ToastContainer />
                {this.props.isLoggedIn ? (
                  <button
                    className="addToCartButton"
                    type="submit"
                    onClick={() => this.handleAddToCartButton(product.id)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    className="addToCartButton"
                    type="button"
                    onClick={this.handleAddToLocalStorage}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.props.user.userType === 'ADMIN' ? (
          <div>
            <EditProduct product={product} />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapProduct = state => {
  return {
    product: state.product,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(fetchProduct(productId)),
    addItemToCart: productId => dispatch(addItem(productId))
  }
}

export default connect(mapProduct, mapDispatchToProps)(Product)
