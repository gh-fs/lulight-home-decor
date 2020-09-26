import axios from 'axios'
import {Next} from 'react-bootstrap/esm/PageItem'
import {fetchSingeProductById} from './singleProduct'

//action types
let SET_CART = 'SET_CART'
let ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
let DELETE_ITEM = 'DELETE_ITEM'

//action creators
const setCart = order => ({
  type: SET_CART,
  order
})

const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})

// const addProductToCart = (product) => ({
//   type: ADD_PRODUCT_TO_CART,
//   product,
// })

//thunk creators
export const getCartFromServer = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`api/orders/${userId}`)
      if (response.data) {
        let order = response.data
        console.log('order returned from axios', order.products)
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
    const response = await axios.put(`/api/products/${productId}`, {
      userId: userId,
      productId: productId
    })
    const updatedOrder = response.data
    console.log('order returned from add to cart', updatedOrder)
    dispatch(setCart(updatedOrder.products))
  }
}

export const deleteItemFromCart = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteItem(productId))
  }
}

const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product]
    case DELETE_ITEM:
      return [...state].filter(product => product.id !== action.productId)
    default:
      return state
  }
}
