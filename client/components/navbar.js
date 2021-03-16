import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartPreview from './cartPreview'
import {getTotalQuantity} from '../store/cart'
import history from '../history'

import NotificationBadge from 'react-notification-badge'
//import {from} from 'nodemailer/lib/smtp-connection/data-stream'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <div id="navBox">
        <div id="logoBox" style={{marginRight: '2em'}}>
          <img id="logo" src="/images/logoOEI.png" />
          <div id="title">Outdoor Equipment Incorporated</div>
        </div>
        <div id="rightSide" style={{width: '100%', minWidth: '585px'}}>
          <div id="searchLinkBox">
            <div className="searchBox">
              <form
                className="searchBox"
                onSubmit={event => {
                  event.preventDefault()
                  let searchBar = document.getElementById('searchBar')
                  history.push(`/categoryview/${searchBar.value}`)
                }}
              >
                <input
                  id="searchBar"
                  type="text"
                  placeholder="Search for great outdoor gear"
                  size="30"
                />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
            {isLoggedIn ? (
              <div
                style={{
                  padding: '1em',
                  display: 'flex',
                  width: '20vw',
                  justifyContent: 'space-between',
                  minWidth: '235px'
                }}
              >
                {/* The navbar will show these links after you log in */}
                <Link to="/home" className="navLink">
                  Home
                </Link>
                <a href="#" onClick={handleClick} className="navLink">
                  Logout
                </a>
                <Link to="/cart" className="navLink" id="cartLink">
                  Cart
                  {/* <img
                    className="cartImage"
                    src="/images/Shopping-Cart-icon.png"
                  /> */}
                  {/* <NotificationBadge count={getTotalQuantity} /> */}
                </Link>
                {/* <div id="cartPreview">
                  <CartPreview />
                </div> */}
              </div>
            ) : (
              <div
                style={{
                  padding: '1em',
                  display: 'flex',
                  width: '20vw',
                  justifyContent: 'space-between',
                  minWidth: '235px'
                }}
              >
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className="navLink">
                  Login
                </Link>
                <Link to="/signup" className="navLink">
                  Sign Up
                </Link>
                <Link to="/guestcart" className="navLink" id="cartLink">
                  Cart
                  {/* <img
                    className="cartImage"
                    src="/images/Shopping-Cart-icon.png"
                  /> */}
                  {/* <NotificationBadge count={getTotalQuantity} /> */}
                </Link>
                {/* <div id="cartPreview">
                  <CartPreview />
                </div> */}
              </div>
            )}
          </div>

          <div id="gearCategories">
            <Link to="/products" className="gearLink">
              All Products
            </Link>
            <Link className="gearLink" to="/categoryview/Footwear">
              Footwear
            </Link>
            <Link className="gearLink" to="/categoryview/Headwear">
              Headwear
            </Link>
            <Link className="gearLink" to="/categoryview/Jackets">
              Jackets
            </Link>
            <Link className="gearLink" to="/categoryview/Gloves">
              Gloves
            </Link>
            <Link className="gearLink" to="/categoryview/Clothing">
              Clothing
            </Link>
            <Link className="gearLink" to="/categoryview/Gear">
              Gear
            </Link>
            <Link className="gearLink" to="/categoryview/Misc">
              Misc.
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
