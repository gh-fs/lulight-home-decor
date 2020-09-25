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
      <div>
        <div>Cart Items (from class component):</div>
        {currentCart &&
          currentCart.map(item => {
            return <li key={item.id}>{item.name}</li>
          })}
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
