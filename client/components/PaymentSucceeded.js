import React from 'react'

export class PaymentSucceeded extends React.Component {
  render() {
    return (
      <div>
        Your payment of ${this.props.location.state.amount} has succeeded.
        Receipt has been sent to {this.props.location.state.email}.
      </div>
    )
  }
}
