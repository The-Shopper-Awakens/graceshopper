import Axios from 'axios'

const PROCEED_TO_PAYMENT = 'PROCEED_TO_PAYMENT'

const getPaymentIntent = clientSecret => {
  return {type: PROCEED_TO_PAYMENT, clientSecret}
}

export const fetchPaymentIntent = amount => {
  return async dispatch => {
    const {data} = await Axios.post('/api/payments/createPayment', {
      amount: amount,
      currency: 'usd'
    })
    dispatch(getPaymentIntent(data.clientSecret))
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case PROCEED_TO_PAYMENT:
      return action.clientSecret
    default:
      return state
  }
}
