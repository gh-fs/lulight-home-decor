import axios from 'axios'

//action types
const SET_PRODUCT = 'SET_PRODUCT'

//action creators
const gotSingleProduct = singleProduct => {
  return {
    type: SET_PRODUCT,
    singleProduct
  }
}

// thunk creators
export const fetchSingleProductById = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(gotSingleProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
