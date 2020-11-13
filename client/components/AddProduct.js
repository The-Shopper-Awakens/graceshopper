import React from 'react'
import {connect} from 'react-redux'
import addProduct from '../store/allProducts'

class AddProduct extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    return <div>HELLO</div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: productId => dispatch(addProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
