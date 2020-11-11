import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []
    console.log(this.props.products)
    console.log(this.props)

    return (
      <div className="container">
        <h1>All Products</h1>
        <ul className="productList">
          {products.map(product => (
            <div key={product.id}>
              <li>{product.name}</li>
              {/* <Product product={product} /> */}
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
