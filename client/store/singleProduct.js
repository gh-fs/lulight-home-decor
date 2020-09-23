import axios from 'axios'

const gotSingleProduct = data => {
  return {
    type: 'GOT_SINGLE_PRODUCT',
    singleProduct: data
  }
}

export const fetchSingleProductById = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  }
}

const initialState = {
  singleProduct: {}
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case 'GOT_SINGLE_PRODUCT':
      return {
        singleProduct: action.singleProduct
      }
    default:
      return state
  }
}
