import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

const Navigation = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar bg="dark" variant="dark">
      <h1>Lulight</h1>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/products">All Products</Nav.Link>
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
          </Nav>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/products">All Products</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </div>
      )}
    </Navbar>
  </div>
)

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

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
Navigation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
