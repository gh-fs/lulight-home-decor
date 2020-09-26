import React from 'react'
import {connect} from 'react-redux'
import {createNewCart, getCartFromServer} from '../store/cart'
import {me} from '../store/user'

export class Cart extends React.Component {
  constructor() {
    super()
    this.calTotal = this.calTotal.bind(this)
  }

  async componentDidMount() {
    await this.props.loadCart(this.props.user.id)
  }

  calTotal(arr) {
    arr.reduce((total, current) => {
      total += current.price * current.orderHistory.quantity
    }, 0)
  }

  render() {
    let currentCart = this.props.cart
    console.log('current cart', currentCart)
    return (
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
                  key={item.id}
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
                          ${(item.price / 100).toFixed(2)} x{' '}
                          {item.orderHistory.quantity}
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
    user: state.user
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
