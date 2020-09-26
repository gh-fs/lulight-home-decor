import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

class Navigation extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <h1>Lulight</h1>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  All Products
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart({this.props.cart.length})
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="#" onClick={this.props.handleClick}>
                  Logout
                </Nav.Link>
              </Nav>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  All Products
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart({this.props.cart.length})
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            </div>
          )}
        </Navbar>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
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
