import axios from 'axios'
import {Next} from 'react-bootstrap/esm/PageItem'
import {fetchSingeProductById} from './singleProduct'

//action types

let SET_CART = 'SET_CART'
let ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

//action creators
const setCart = order => ({
  type: SET_CART,
  order
})
const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})
//thunk creators
export const getCartFromServer = userId => {
  return async dispatch => {
    try {
      // console.log('we are in the reducer')
      // console.log(userId)
      const response = await axios.get(`api/orders/${userId}`)
      // console.log('order with joint table', order)
      // console.log(order.products)

      if (response.data) {
        let order = response.data
        dispatch(setCart(order.products))
      } else {
        console.log('NO cart before')
        dispatch(createNewCart(userId))
      }
    } catch (err) {
      //console.error(err)
      console.log('error occurred with getCartFromServer thunk creator')
    }
  }
}

export const createNewCart = userId => {
  return async dispatch => {
    try {
      // console.log(userId)
      const {data: newCart} = await axios.post('/api/orders', {userId})
      dispatch(setCart(newCart))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addProductToServCart = (productId, userId) => {
  return async dispatch => {
    const orderProduct = await axios.put(`/api/products/${productId}`, {
      userId: userId,
      productId: productId
    })
    console.log(orderProduct.data)

    // const newProduct = dispatch(fetchSingleProductById(orderProduct.productId))
    // dispatch(addProductToCart(newProduct))
  }
}

const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
