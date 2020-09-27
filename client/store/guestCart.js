import axios from 'axios'

let SET_GUEST_CART = 'SET_GUEST_CART'
let ADD_PRODUCT_TO_GUEST_CART = 'ADD_PRODUCT_TO_GUEST_CART'

const setGuestCart = guestCart => ({
  type: SET_GUEST_CART,
  guestCart
})

const addProduct = product => ({
  type: ADD_PRODUCT_TO_GUEST_CART,
  product
})

//for guest
//thunk creator
export const getCartFromLocalStorage = () => {
  return async dispatch => {
    const previousGuestCart =
      (await JSON.parse(localStorage.getItem('guestCart'))) || []
    dispatch(setGuestCart(previousGuestCart))
    // const JSONready = JSON.stringify(previousGuestCart)
    // localStorage.setItem('guestCart', JSONready)
  }
}

export const addProductToGuestCart = productId => {
  return async dispatch => {
    const selectProduct = await axios.get(`/api/products/${productId}`)
    dispatch(addProduct(selectProduct.data))
  }
}

const initialState = []

export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_CART:
      return action.guestCart
    case ADD_PRODUCT_TO_GUEST_CART:
      return [...state, action.product]
    default:
      return state
  }
}
