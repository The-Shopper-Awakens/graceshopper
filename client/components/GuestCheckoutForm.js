import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import history from '../history'

class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      address: '',
      cityState: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    //get cart data from local storage
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    let email = this.state.email
    //put user data in local storage
    window.localStorage.setItem('userInfo', JSON.stringify(this.state))
    //let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    //console.log(userInfo)
    //console.log(cart)
    //create a new Order instance and a new Order_Products instance
    await axios.post('/api/cart/guestcheckout', {cart, email})
    //make a local storage order and empty cart
    window.localStorage.setItem('order', JSON.stringify(cart))
    window.localStorage.setItem('cart', JSON.stringify([]))
    //history.push to new page
    history.push('/guestcheckout')
  }

  componentDidMount() {}

  render() {
    return (
      <div className="checkoutBox">
        <div className="checkoutLeft">
          <div className="stripePlaceholder">
            <h1>Stripe Placeholder</h1>
            <p>Use card number: 4242 4242 4242 4242</p>
          </div>
        </div>
        <div className="checkoutRight">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div className="formLine">
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  size="45"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formLine">
                <label htmlFor="address">Street Address: </label>
                <input
                  type="text"
                  name="address"
                  size="37"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formLine">
                <label htmlFor="cityState">City/State: </label>
                <input
                  type="text"
                  name="cityState"
                  size="41"
                  value={this.state.cityState}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formLine">
                <label htmlFor="zip">Zip Code: </label>
                <input
                  type="text"
                  name="zip"
                  size="42"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
              </div>
              <div className="submitBox">
                <button
                  type="submit"
                  className="submitOrderButton"
                  disabled={
                    !this.state.email.length &&
                    !this.state.address.length &&
                    !this.state.cityState.length &&
                    !this.state.zip.length
                  }
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckoutForm)
