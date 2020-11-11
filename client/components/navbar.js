import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

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
                <Link to="/cart" className="navLink">
                  Cart
                </Link>
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
              </div>
            )}
          </div>
          <div id="gearCategories">
            <Link to="/products" className="gearLink">
              All Products
            </Link>
            <div className="gearLink">Tents</div>
            <div className="gearLink">Footwear</div>
            <div className="gearLink">Backpacks</div>
            <div className="gearLink">Cooking</div>
            <div className="gearLink">Clothing</div>
            <div className="gearLink">Jackets</div>
            <div className="gearLink">Headwear</div>
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
