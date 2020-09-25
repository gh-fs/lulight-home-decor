import React from 'react'
import {connect} from 'react-redux'
import {createNewCart, getCartFromServer} from '../store/cart'
import {me} from '../store/user'

export function Cart(props) {
  console.log(props.user)
  return <div>Testing</div>
}
// export class Cart extends React.Component {
//   // constructor(){
//   //   this.state={
//   //     cart:
//   //   }
//   // }
//   async componentDidMount() {
//     console.log('incomponent did mount')
//     let user = await this.props.loadUser()
//     console.log(this.props)
//     // console.log('this is before the loadcart!!!!', this.props.user)
//     await this.props.loadCart(2)
//   }
//   render() {
//     // let user = this.props.user
//     // // if (user.id) {
//     // let cart = this.props.loadCart(user.id)
//     // console.log('cart', cart)
//     // // }

//     // console.log(this.props.user)
//     // console.log(this.props.cart)

//     return <div>Hello</div>
//   }
// }

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
    },
    createCart: userId => {
      dispatch(createNewCart(userId))
    },
    loadUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
