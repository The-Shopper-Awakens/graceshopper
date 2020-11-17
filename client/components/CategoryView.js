import React from 'react'
import {connect} from 'react-redux'
import Product from './ProductList'
import {fetchProducts} from '../store/allProducts'

export class CategoryView extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getProducts()
  }

  render() {
    console.log(this.props)
    let category = this.props.match.params.name
    let products = this.props.products || []
    products = products.filter(item => item.category === category)

    return (
      <div className="container">
        <h1>{category}</h1>
        <div className="allProducts">
          <ul className="productList">
            {products.map(product => (
              <div key={product.id}>
                <Product product={product} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(CategoryView)
