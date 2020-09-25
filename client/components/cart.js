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

  async componentDidMount() {
    // console.log('props in componentDidMount', this.props)
    // let user = this.props.user
    // if (user.id) {
    //   await this.props.loadCart(user.id)
    // }
    await this.props.loadCart(2)
  }
  render() {
    // console.log('user in render of cart component', this.props.user)
    // console.log('cart in render of cart component', this.props.cart)
    let currentCart = this.props.cart

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
          <div className="cart">
            <ul className="cart-items">
              {currentCart &&
                currentCart.map(item => (
                  <li key={item.id}>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>{item.name}</div>
                    <div className="right">
                      ${item.price} x {item.count}
                      <button
                        className="button" /*onClick={() => this.props.removeFromCart(item)}*/
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="cart">
            <div className="total">
              <div>Total: 0</div>
            </div>
            <div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        </div>
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
