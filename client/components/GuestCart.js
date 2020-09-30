import React from 'react'
import {connect} from 'react-redux'
import {
  getCartFromLocalStorage,
  addProductToGuestCart,
  decreaseQuantity,
  deleteInGuestCart,
  submitGuestOrder
} from '../store/guestCart'
import {Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.calQuantity = this.calQuantity.bind(this)
    this.calTotal = this.calTotal.bind(this)
  }

  componentDidMount() {
    this.props.loadGuestCart()
  }

  calQuantity(arr) {
    let totalQuantity = arr.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    return totalQuantity
  }

  calTotal(arr) {
    let checkoutTotal = arr.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    return (checkoutTotal / 100).toFixed(2)
  }

  render() {
    let LocalStorageCart
    if (localStorage.guestCart) {
      LocalStorageCart = JSON.parse(localStorage.guestCart)
    } else {
      LocalStorageCart = []
    }

    if (this.props.guestCart.length) {
      return (
        <Container>
          <div className="cart cart-header">
            There are {this.calQuantity(this.props.guestCart)} products in your
            cart
          </div>
          <div>
            {this.props.guestCart.map(item => {
              return (
                <div
                  className="card mb-3 single-card"
                  style={{maxWidth: '540px'}}
                  key={item.productId}
                >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={item.imageURL}
                        className="card-img"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                          Price: ${(item.price / 100).toFixed(2)}
                        </p>
                        <div>
                          <p>
                            Quantity:{' '}
                            <Button
                              variant="dark"
                              size="sm"
                              onClick={() =>
                                this.props.decreaseQuantityInReact(
                                  item.productId
                                )
                              }
                            >
                              -
                            </Button>{' '}
                            {item.quantity}{' '}
                            <Button
                              variant="dark"
                              size="sm"
                              onClick={() =>
                                this.props.increaseQuantity(item.productId)
                              }
                            >
                              +
                            </Button>
                          </p>
                        </div>
                        <Button
                          variant="dark"
                          onClick={() =>
                            this.props.deleteItemInReact(item.productId)
                          }
                        >
                          Remove From Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="cart-total">
            Total Due at Checkout: $
            {this.props.guestCart.length
              ? this.calTotal(this.props.guestCart)
              : 0}
          </div>

          <Button
            variant="dark"
            onClick={() => this.props.submitOrder(this.props.guestCart)}
          >
            <Link to="/thankyou">Submit Order</Link>
          </Button>
        </Container>
      )
    } else {
      return <div className="cart cart-header">Your cart is empty</div>
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
    },
    increaseQuantity: productId => {
      dispatch(addProductToGuestCart(productId))
    },
    decreaseQuantityInReact: productId => {
      dispatch(decreaseQuantity(productId))
    },
    deleteItemInReact: productId => {
      dispatch(deleteInGuestCart(productId))
    },
    submitOrder: guestOrder => {
      dispatch(submitGuestOrder(guestOrder))
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
