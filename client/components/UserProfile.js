import React from 'react'
import {connect} from 'react-redux'
import InvoiceForm from './InvoiceForm'
import axios from 'axios'

export class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      orders: [],
      orderSelected: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/cart/orders')
    console.log(data)
    this.setState({orders: data})
  }

  handleClick(orderId) {
    let order = this.state.orders.filter(order => order.id === orderId)
    this.setState({orderSelected: order})
    console.log(this.state)
  }

  render() {
    return (
      <div className="container">
        <div className="userContainer">
          <div className="userInfo">
            <h3>User Information</h3>
            <div>Email: {this.props.user.email}</div>
            <div>
              Account Created on:{' '}
              {this.props.user.createdAt
                .split('')
                .slice(0, this.props.user.createdAt.indexOf('T'))
                .join('')}
            </div>
          </div>
          <div className="pastOrders">
            <h3>Past Orders</h3>
            {this.state.orders.length ? (
              <table id="cartTable">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Price</th>
                    <th>View Invoice</th>
                  </tr>
                  {this.state.orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.createdAt
                          .split('')
                          .slice(0, this.props.user.createdAt.indexOf('T'))
                          .join('')}
                      </td>
                      <td>
                        {order.Products.reduce((total, product) => {
                          return (total += product.Order_Product.quantity)
                        }, 0)}
                      </td>
                      <td>
                        $
                        {(
                          order.Products.reduce((total, product) => {
                            return (total += product.Order_Product.price)
                          }, 0) / 100
                        ).toFixed(2)}
                      </td>
                      <td
                        className="clickable"
                        onClick={() => this.handleClick(order.id)}
                      >
                        ORDER {order.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>You have no past orders.</div>
            )}
          </div>
        </div>
        {this.state.orderSelected.length ? (
          <InvoiceForm
            order={this.state.orderSelected}
            user={this.props.user}
          />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserProfile)
