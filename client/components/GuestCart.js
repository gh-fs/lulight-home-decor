import React from 'react'
import {connect} from 'react-redux'
import {
  getCartFromLocalStorage,
  addProductToGuestCart
} from '../store/guestCart'
import {Container, Button} from 'react-bootstrap'

//if not logged in, got to /guestcart
class GuestCart extends React.Component {
  //constructor
  constructor() {
    super()
    this.increaseQuantityGuestCart = this.increaseQuantityGuestCart.bind(this)
  }

  componentDidMount() {
    this.props.loadGuestCart()
  }

  increaseQuantityGuestCart(productId) {
    // console.log('before add new item : ', this.props.guestCart)

    this.props.increaseQuantity(productId)

    //steps:
    //1:add product to redux store
    //2:get guestCart with new add product (refreshedcart)
    //3:set localStorage.guestCart to JSON.parse(refreshedcart)
    //problem is this.props.guestCart is still empty after add product
    // console.log('after add new item', this.props.guestCart)
    // const currentProduct = await axios.get(`/api/products/${productId}`)
    console.log('is the quantity correct?', this.props.guestCart)
    const JSONready = JSON.stringify([...this.props.guestCart])
    // console.log('updated quantity cart', JSONready)
    localStorage.setItem('guestCart', JSONready)
    console.log('is the quantity correct after correct?', this.props.guestCart)
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
    let uniqueArr = []
    let quantityObj = {}

    for (let item of LocalStorageCart) {
      //for quantity obj store repeat item
      if (item.name in quantityObj) {
        // console.log(quantityObj[item.name])
        quantityObj[item.name] = quantityObj[item.name] + 1
      } else {
        quantityObj[item.name] = 1
      }
      //only push a product one time
      //need to use item.name since in the product object (from db) has createAt...
      //make each product in the array different item even they have same name
      if (!uniqueArr.includes(item.name)) {
        uniqueArr.push(item.name)
      }
    }
    // console.log(quantityObj)
    console.log('localStorage', LocalStorageCart)
    console.log('guest Cart', this.props.guestCart)

    if (LocalStorageCart.length) {
      return (
<<<<<<< HEAD
        <Container>
          <div>
            {LocalStorageCart.map(item => {
              return (
                <Container key={item.productId}>
                  <div>
                    <h3>{item.name}</h3>
                    <input type="text" value={item.quantity} />
                    <button
                      onClick={() =>
                        this.increaseQuantityGuestCart(item.productId)
                      }
                    >
                      +
                    </button>

                    <Button>-</Button>
                    <br />
                    <Button>Remove from cart</Button>
                  </div>
                </Container>
              )
            })}
          </div>
        </Container>
=======
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
>>>>>>> 8120c86aa5d4c224668a9b7dfb41cf29f9a2d364
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
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
