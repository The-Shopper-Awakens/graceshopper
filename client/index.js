import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

// establishes socket connection
import './socket'

const promise = loadStripe(
  'pk_test_51HoKPgIPlXyRn90sj4konby739jd6RRYkOAJl6PYyqP8e2qNHwub3jLkn7X1lvL47iZqUv1niX39R8d6tG4Av9XA00MS9wXW1O'
)

ReactDOM.render(
  <Elements stripe={promise}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </Elements>,
  document.getElementById('app')
)
