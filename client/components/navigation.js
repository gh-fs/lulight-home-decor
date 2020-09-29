import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

class Navigation extends React.Component {
  constructor() {
    super()
    this.calQuantity = this.calQuantity.bind(this)
    this.calGuestCartQuantity = this.calGuestCartQuantity.bind(this)
  }

  componentDidMount() {}

  calQuantity(arr) {
    // console.log(item)
    let totalQuantity = arr.reduce((total, item) => {
      return total + item.orderHistory.quantity
    }, 0)

    return totalQuantity
  }

  calGuestCartQuantity(arr) {
    let totalQuantity = arr.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    return totalQuantity
  }

  render() {
    console.log(this.props.guestCart)
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
                  Our Products
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart (
                  {this.props.cart.length
                    ? this.calQuantity(this.props.cart)
                    : 0}
                  )
                </Nav.Link>
                {this.props.isAdmin && (
                  <Nav.Link as={Link} to="/users">
                    View Users
                  </Nav.Link>
                )}
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
                <Nav.Link as={Link} to="/guestcart">
                  GuestCart(
                  {this.props.guestCart.length
                    ? this.calGuestCartQuantity(this.props.guestCart)
                    : 0}
                  )
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
    isAdmin: state.user.isAdmin,
    cart: state.cart,
    guestCart: state.guestCart
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
