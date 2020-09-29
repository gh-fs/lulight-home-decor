import axios from 'axios'

//action types
const SET_CART = 'SET_CART'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

//action creators
const setCart = order => ({
  type: SET_CART,
  order
})

const addItem = order => ({
  type: SET_CART,
  order
})

const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})

const clearCart = emptyCart => ({
  type: CLEAR_CART,
  emptyCart
})

//thunk creators
export const getCartFromServer = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`api/orders/${userId}`)
      let order = response.data
      dispatch(setCart(order.products))
    } catch (err) {
      console.log('error occurred with getCartFromServer thunk creator')
    }
  }
}

export const removeItemFromCart = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/remove/${productId}`)
    dispatch(deleteItem(productId))
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
    dispatch(addItem(updatedOrder.products))
  }
}

export const decreaseInCart = productId => {
  return async dispatch => {
    const {data} = await axios.delete(`/api/products/${productId}`)
    dispatch(setCart(data.products))
  }
}

export const submitOrder = userId => {
  if (!userId) {
    console.log('this cart belongs to a guest')
    // return async (dispatch) => {
    //   await axios.post(`/api/orders/`)
    //   dispatch(clearCart([]))
    // }
  } else {
    return async dispatch => {
      await axios.put(`/api/orders/${userId}`)
      dispatch(clearCart([]))
    }
  }
}

const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order
    case ADD_ITEM:
      return action.order
    case DELETE_ITEM:
      return [...state].filter(product => product.id !== action.productId)
    case CLEAR_CART:
      return action.emptyCart
    default:
      return state
  }
}
