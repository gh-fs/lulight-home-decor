import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartFromLocalStorage} from '../store/guestCart'
import {Container, Button} from 'react-bootstrap'

//if not logged in, got to /guestcart
class GuestCart extends React.Component {
  componentDidMount() {
    this.props.loadGuestCart()
  }

  render() {
    let LocalStorageCart
    if (localStorage.guestCart) {
      LocalStorageCart = JSON.parse(localStorage.guestCart)
    } else {
      LocalStorageCart = []
    }
    console.log('guestCart load success in page?', LocalStorageCart)
    if (LocalStorageCart.length) {
      return (
        <div>
          {LocalStorageCart.map((item, idx) => {
            return (
              <Container key={idx}>
                <div>
                  <h3>{item.name}</h3>
                  <h3>+</h3>
                  <input type="text" value="1" />
                  <h3>-</h3>
                </div>
              </Container>
            )
          })}
          <Button variant="dark">
            <Link to="/payment">Proceed to Checkout</Link>
          </Button>
        </div>
      )
    } else {
      return (
        <div>your cart is currently empty, please add items to your cart</div>
      )
    }
  }
}

const mapState = state => {
  return {
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    loadGuestCart: () => {
      dispatch(getCartFromLocalStorage())
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
