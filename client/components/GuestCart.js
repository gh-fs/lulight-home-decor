import React from 'react'
import {connect} from 'react-redux'
import {
  getCartFromLocalStorage,
  addProductToGuestCart,
  decreaseQuantity,
  deleteInGuestCart,
  setLocalStorageGuestCart
} from '../store/guestCart'
import {Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

//if not logged in, got to /guestcart
class GuestCart extends React.Component {
  //constructor
  constructor() {
    super()
    this.increaseQuantityGuestCart = this.increaseQuantityGuestCart.bind(this)
    this.decreaseQuantityGuestCart = this.decreaseQuantityGuestCart.bind(this)
    this.calGuestCartQuantity = this.calGuestCartQuantity.bind(this)
  }

  componentDidMount() {
    console.log('from component did mount', this.props.guestCart)
    this.props.loadGuestCart()
  }

  calGuestCartQuantity(arr) {
    let totalQuantity = arr.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    return totalQuantity
  }

  async increaseQuantityGuestCart(productId) {
    console.log('pre + button', this.props.guestCart)

    //change store data with new quantity
    await this.props.increaseQuantity(productId)
    await this.props.getUpdatedCart()
    // const JSONready = JSON.stringify([...this.props.guestCart])
    // console.log('updated quantity cart', JSONready)
    // localStorage.setItem('guestCart', JSONready)
    // console.log('post + button', this.props.guestCart)
  }

  decreaseQuantityGuestCart(productId) {
    this.props.decreaseQuantityInReact(productId)

    // console.log('is the quantity correct?', this.props.guestCart)
    const JSONready = JSON.stringify([...this.props.guestCart])
    // console.log('updated quantity cart', JSONready)
    localStorage.setItem('guestCart', JSONready)
    // console.log('is the quantity correct after correct?', this.props.guestCart)
  }

  render() {
    console.log('guest Cart in render', this.props.guestCart)
    let LocalStorageCart
    if (localStorage.guestCart) {
      LocalStorageCart = JSON.parse(localStorage.guestCart)
    } else {
      LocalStorageCart = []
    }
    //[{},{}]
    // console.log('guestCart load success in page?', LocalStorageCart)
    // let uniqueArr = []
    // let quantityObj = {}

    // for (let item of this.props.guestCart) {
    //   //for quantity obj store repeat item
    //   if (item.name in quantityObj) {
    //     // console.log(quantityObj[item.name])
    //     quantityObj[item.name] = quantityObj[item.name] + 1
    //   } else {
    //     quantityObj[item.name] = 1
    //   }
    //   //only push a product one time
    //   //need to use item.name since in the product object (from db) has createAt...
    //   //make each product in the array different item even they have same name
    //   if (!uniqueArr.includes(item.name)) {
    //     uniqueArr.push(item.name)
    //   }
    // }
    // console.log(quantityObj)
    console.log('localStorage', LocalStorageCart)
    console.log('guest Cart', this.props.guestCart)

    if (this.props.guestCart.length) {
      return (
        <Container>
          <div className="cart cart-header">
            There are {this.calGuestCartQuantity(this.props.guestCart)} products
            in your cart
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
                                this.decreaseQuantityGuestCart(item.productId)
                              }
                            >
                              -
                            </Button>{' '}
                            {item.quantity}{' '}
                            <Button
                              variant="dark"
                              size="sm"
                              onClick={() =>
                                this.increaseQuantityGuestCart(item.productId)
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
          <Button variant="dark">
            <Link to="/thankyou">Proceed to Checkout</Link>
          </Button>
        </Container>
      )
    } else {
      return (
        <div className="cart cart-header">
          your cart is currently empty, please add items to your cart
        </div>
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
    getUpdatedCart: () => {
      dispatch(setLocalStorageGuestCart())
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
