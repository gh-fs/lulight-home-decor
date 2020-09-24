import React from 'react'
import {connect} from 'react-redux'
import {createNewCart, getCartFromServer} from '../store/cart'
import {me} from '../store/user'

export class Cart extends React.Component {
  async componentDidMount() {
    let user = await this.props.loadUser()
    console.log(user)
    console.log('this is before the loadcart!!!!', this.props.user)
    await this.props.loadCart(this.props.user.id)
  }
  render() {
    console.log(this.props.cart)
    console.log(this.props.user)
    return <div>Hello</div>
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
