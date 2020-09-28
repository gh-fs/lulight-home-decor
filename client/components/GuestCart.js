import React from 'react'
import {connect} from 'react-redux'
import {getCartFromLocalStorage} from '../store/guestCart'
import {Container} from 'react-bootstrap'

//if not logged in, got to /guestcart
class GuestCart extends React.Component {
  //constructor
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
    // console.log(uniqueArr)

    if (LocalStorageCart.length) {
      return (
        <Container>
          <div>
            {uniqueArr.map((item, idx) => {
              return (
                <Container key={idx}>
                  <div>
                    <h3>{item}</h3>
                    <button>+</button>
                    <input type="text" value={quantityObj[item]} />
                    <button>-</button>
                    <br />
                    <button>Remove from cart</button>
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
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
