import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartPreview from './cartPreview'
import {getTotalQuantity} from '../store/cart'

import NotificationBadge from 'react-notification-badge'
import {from} from 'nodemailer/lib/smtp-connection/data-stream'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <div id="navBox">
        <div id="logoBox">
          <img id="logo" src="/images/logoOEI.png" />
          <div id="title">Outdoor Equipment Incorporated</div>
        </div>
        <div id="rightSide">
          <div id="searchLinkBox">
            <div id="searchBox">
              <form>
                <input
                  id="searchBar"
                  type="text"
                  placeholder="Search for great outdoor gear"
                  size="40"
                />
              </form>
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home" className="navLink">
                  Home
                </Link>
                <a href="#" onClick={handleClick} className="navLink">
                  Logout
                </a>
                <Link to="/cart" className="navLink" id="cartLink">
                  Cart
                  <img className="cartImage" src="/images/Shopping-Cart-icon" />
                  <NotificationBadge count={getTotalQuantity} />
                </Link>
                {/* <div id="cartPreview">
                  <CartPreview />
                </div> */}
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className="navLink">
                  Login
                </Link>
                <Link to="/signup" className="navLink">
                  Sign Up
                </Link>
                <Link to="/guestcart" className="navLink" id="cartLink">
                  <img className="cartImage" src="/images/Shopping-Cart-icon" />
                  Cart
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
