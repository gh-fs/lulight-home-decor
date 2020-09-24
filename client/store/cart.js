import axios from 'axios'
import {Next} from 'react-bootstrap/esm/PageItem'
//action types
let GET_CART_FROM_SERVER = 'GET_CART_FROM_SERVER'
let SET_CART = 'SET_CART'
let CREATE_NEW_CART = 'CREATE_NEW_CART'
//action creators
const setCart = order => ({
  type: SET_CART,
  order
})
//thunk creators
export const getCartFromServer = userId => {
  return async dispatch => {
    try {
      console.log('we are in the reducer')
      console.log(userId)
      const response = await axios.get(`api/orders/${userId}`)
      let order = response.data
      console.log(order)
      if (order) {
        dispatch(setCart(order))
      } else {
        dispatch(createNewCart(userId))
      }
    } catch (err) {
      //console.error(err)
      console.log('error from thunk creator')
    }
  }
}
export const createNewCart = userId => {
  return async dispatch => {
    try {
      console.log(userId)
      const {data: newCart} = await axios.post('/api/orders', {userId})
      dispatch(setCart(newCart))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order
    default:
      return state
  }
}
