import React from 'react'
import {connect} from 'react-redux'
import {
  getCartFromLocalStorage,
  addProductToGuestCart,
  decreaseQuantity,
  deleteInGuestCart
} from '../store/guestCart'
import {Container, Button} from 'react-bootstrap'

//if not logged in, got to /guestcart
class GuestCart extends React.Component {
  //constructor
  constructor() {
    super()
    this.increaseQuantityGuestCart = this.increaseQuantityGuestCart.bind(this)
    this.decreaseQuantityGuestCart = this.decreaseQuantityGuestCart.bind(this)
  }

  componentDidMount() {
    console.log('from component did mount', this.props.guestCart)
    this.props.loadGuestCart()
  }

  increaseQuantityGuestCart(productId) {
    this.props.increaseQuantity(productId)
    console.log('is the quantity correct?', this.props.guestCart)
    const JSONready = JSON.stringify([...this.props.guestCart])
    // console.log('updated quantity cart', JSONready)
    localStorage.setItem('guestCart', JSONready)
    console.log('is the quantity correct after correct?', this.props.guestCart)
  }

  async decreaseQuantityGuestCart(productId) {
    await this.props.decreaseQuantityInReact(productId)

    // console.log('is the quantity correct?', this.props.guestCart)
    const JSONready = JSON.stringify([...this.props.guestCart])
    // console.log('updated quantity cart', JSONready)
    localStorage.setItem('guestCart', JSONready)
    // console.log('is the quantity correct after correct?', this.props.guestCart)
  }

  render() {
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
          <div>
            {this.props.guestCart.map(item => {
              return (
                <Container key={item.productId}>
                  <div>
                    <h3>{item.name}</h3>
                    <button
                      type="button"
                      onClick={() =>
                        this.increaseQuantityGuestCart(item.productId)
                      }
                    >
                      +
                    </button>
                    <input type="text" value={item.quantity} />
                    <button
                      type="button"
                      onClick={() =>
                        this.decreaseQuantityGuestCart(item.productId)
                      }
                    >
                      -
                    </button>
                    <br />
                    <button
                      type="button"
                      onClick={() =>
                        this.props.deleteItemInReact(item.productId)
                      }
                    >
                      Remove from cart
                    </button>
                  </div>
                </Container>
              )
            })}
          </div>
        </Container>
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
    },
    increaseQuantity: productId => {
      dispatch(addProductToGuestCart(productId))
    },
    decreaseQuantityInReact: productId => {
      dispatch(decreaseQuantity(productId))
    },
    deleteItemInReact: productId => {
      dispatch(deleteInGuestCart(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
