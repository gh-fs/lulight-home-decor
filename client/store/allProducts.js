import axios from 'axios'

//action types
const SET_PRODUCTS = 'SET_PRODUCTS'

//action creators
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//thunk creators
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      const action = setProducts(products)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
