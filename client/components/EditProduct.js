import React from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../store/allProducts'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      category: '',
      inventory: 0,
      imageUrl: '/images/defaultProduct.png',
      disableEditing: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log(this.props.product)
    console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    const editedProduct = {
      name: this.state.name,
      price: this.state.price,
      inventory: this.state.inventory,
      category: this.state.category,
      imageUrl: this.state.imageUrl
    }
    this.props.editProduct(editedProduct)
    this.setState({
      name: '',
      price: '',
      category: '',
      inventory: 0,
      imageUrl: '/images/defaultProduct.png'
    })
  }

  render() {
    return (
      <div className="container">
        <button
          type="button"
          className="addButton"
          onClick={() =>
            this.setState({
              name: this.props.product.name,
              price: this.props.product.price,
              category: this.props.product.category,
              inventory: this.props.product.inventory,
              imageUrl: this.props.product.imageUrl,
              disableEditing: false
            })
          }
        >
          Edit Product
        </button>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div>
              <div>
                <label htmlFor="name">Product Name: </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className={
                    !this.state.name.length && !this.state.disableEditing
                      ? 'required'
                      : ''
                  }
                  disabled={this.state.disableEditing}
                />
                <label htmlFor="price"> Price: </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  className={
                    !this.state.price.length && !this.state.disableEditing
                      ? 'required'
                      : ''
                  }
                  disabled={this.state.disableEditing}
                />
                <label htmlFor="inventory"> Inventory: </label>
                <input
                  type="number"
                  name="inventory"
                  value={this.state.inventory}
                  onChange={this.handleChange}
                  className={
                    !this.state.inventory.length && !this.state.disableEditing
                      ? 'required'
                      : ''
                  }
                  disabled={this.state.disableEditing}
                />
              </div>
              <div>
                <label htmlFor="category"> Category: </label>
                <input
                  type="text"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  disabled={this.state.disableEditing}
                />
                <label htmlFor="imageUrl"> Image URL: </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  disabled={this.state.disableEditing}
                />
              </div>
            </div>
            <div>
              <button
                className="submitButton"
                type="submit"
                disabled={
                  !this.state.name.length ||
                  !this.state.price.length ||
                  !this.state.inventory.length
                }
              >
                Submit
              </button>
              {this.state.disableEditing ? (
                <div />
              ) : !this.state.name.length ||
              !this.state.price.length ||
              !this.state.inventory.length ? (
                <span id="requiredMessage">
                  * Name, Price and Inventory are required
                </span>
              ) : (
                <div />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProduct: product => dispatch(editProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)

//something is fishy with the submit button being disabled
//becomes enabled as soon as price and category are edited
// tells me something is wrong with the wayt they are in state
//api route or thunk is not working either
