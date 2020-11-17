import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'

export class UserProfile extends React.Component {
  render() {
    return (
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
          <div>Order #98 on 2020-11-17</div>
        </div>
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
