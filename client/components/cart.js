import React from 'react'
import {connect} from 'react-redux'
import {createNewCart, getCartFromServer} from '../store/cart'
import {me} from '../store/user'

// export function Cart(props) {
//   let user = props.user
//   props.loadCart(user.id)

//   let currentCart = props.cart
//   return (
//     <div>
//       <div>Cart Items (from functional component):</div>
//       {currentCart.map((item) => {
//         return <li key={item.id}>{item.name}</li>
//       })}
//     </div>
//   )
// }

export class Cart extends React.Component {
  // const removeFromCart = (product) => {
  //   const currentItem = this.state.currentCart.slice();
  //   currentItem.filter(x=>x.id !== product.id)
  // }
  constructor() {
    super()
    this.calTotal = this.calTotal.bind(this)
  }

  async componentDidMount() {
    // console.log('props in componentDidMount', this.props)
    // let user = this.props.user
    // if (user.id) {
    //   await this.props.loadCart(user.id)
    // }
    console.log(this.props.user.id)
    await this.props.loadCart(this.props.user.id)
  }

  calTotal(arr) {
    arr.reduce((total, current) => {
      return (total += current.price * current.orderHistory.quantity)
    }, 0)
  }

  render() {
    // console.log('user in render of cart component', this.props.user)
    // console.log('cart in render of cart component', this.props.cart)

    let currentCart = this.props.cart
    console.log('current cart', currentCart)
    return (
      // <div>
      //   <div>Cart Items (from class component):</div>
      //   {currentCart &&
      //     currentCart.map(item => {
      //       return <li key={item.id}>{item.name}</li>
      //     })}
      // </div>
      <div>
        {currentCart.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {currentCart.length} products in the cart
          </div>
        )}
        <div>
          {currentCart &&
            currentCart.map(item => {
              return (
                <div
                  className="card mb-3"
                  style={{maxWidth: '540px'}}
                  key={item.orderHistory.productId}
                >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        className="card-img"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                          ${item.price} x {item.orderHistory.quantity}
                        </p>
                        <p className="card-text">
                          <small className="text-muted">button</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div>Total : $100</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user,
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadCart: userId => {
      dispatch(getCartFromServer(userId))
    }
    // createCart: (userId) => {
    //   dispatch(createNewCart(userId))
    // },
    // loadUser: () => {
    //   dispatch(me())
    // },
  }
}

export default connect(mapState, mapDispatch)(Cart)
