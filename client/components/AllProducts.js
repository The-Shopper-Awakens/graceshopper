import React from 'react'
import {connect} from 'react-redux'
import Product from './ProductList'
import AddProduct from './AddProduct'
import {fetchProducts} from '../store/allProducts'
import Pagination from './Pagination'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      productsPerPage: 9
    }
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  incrementPage() {
    if (
      this.props.products.length / this.state.currentPage >=
      this.state.productsPerPage
    ) {
      let curPage = this.state.currentPage
      this.setState({currentPage: curPage + 1})
    }
  }

  decrementPage() {
    if (this.state.currentPage !== 1) {
      let curPage = this.state.currentPage
      this.setState({currentPage: curPage - 1})
    }
  }

  render() {
    window.scrollTo(0, 0)
    console.log(this.state)
    let products = this.props.products || []
    let indexOfLastPost = this.state.currentPage * this.state.productsPerPage
    let indexOfFirstPost = indexOfLastPost - this.state.productsPerPage
    products = products.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <div className="APcontainer">
        <h1>All Products</h1>
        <div className="allProducts">
          <ul className="productList">
            {products.map(product => (
              <div key={product.id}>
                <Product product={product} />
              </div>
            ))}
          </ul>
        </div>
        <Pagination
          incrementPage={this.incrementPage}
          decrementPage={this.decrementPage}
          currentPage={this.state.currentPage}
        />{' '}
        {this.props.user.userType === 'ADMIN' ? (
          <div>
            <AddProduct />
          </div>
        ) : (
          <div />
        )}
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

export default connect(mapState, mapDispatch)(AllProducts)
