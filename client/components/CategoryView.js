import React from 'react'
import {connect} from 'react-redux'
import Product from './ProductList'
import {fetchProducts} from '../store/allProducts'
import Pagination from './Pagination'

export class CategoryView extends React.Component {
  constructor() {
    super()
    this.state = {
      productsLength: 0,
      currentPage: 1,
      productsPerPage: 9
    }
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
  }

  async componentDidMount() {
    console.log(this.props)
    await this.props.getProducts()
    let category = this.props.match.params.name
    this.setState({
      productsLength: this.props.products.filter(
        item => item.category === category
      ).length
    })
    window.scrollTo(0, 0)
  }

  incrementPage() {
    if (
      this.state.productsLength / this.state.currentPage >=
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
    let category = this.props.match.params.name
    let indexOfLastPost = this.state.currentPage * this.state.productsPerPage
    let indexOfFirstPost = indexOfLastPost - this.state.productsPerPage
    let products = this.props.products
      .filter(item => item.category === category)
      .slice(indexOfFirstPost, indexOfLastPost)

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
        <Pagination
          incrementPage={this.incrementPage}
          decrementPage={this.decrementPage}
          currentPage={this.state.currentPage}
        />
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
