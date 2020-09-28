import axios from 'axios'

let SET_GUEST_CART = 'SET_GUEST_CART'
let ADD_PRODUCT_TO_GUEST_CART = 'ADD_PRODUCT_TO_GUEST_CART'
let CHANGE_QUANTITY = 'CHANGE_QUANTITY'

const setGuestCart = guestCart => ({
  type: SET_GUEST_CART,
  guestCart
})

const addProduct = product => ({
  type: ADD_PRODUCT_TO_GUEST_CART,
  product
})

const changeQuantity = product => ({
  type: CHANGE_QUANTITY,
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
    //if product already in local storage, just increase quantity
    //else add the object
    let productObj = {
      productId: selectProduct.data.id,
      name: selectProduct.data.name,
      price: selectProduct.data.price,
      imageURL: selectProduct.data.image,
      category: selectProduct.data.category,
      description: selectProduct.data.description,
      inventory: selectProduct.data.inventory,
      quantity: 1
    }
    let previousGuestCart = JSON.parse(localStorage.getItem('guestCart'))
    console.log('previos Cart', previousGuestCart)
    //[{name:A,quantity:2},{name:B,quantity:1}]

    //[{},{}]
    //previosuGuestCart.length>0
    if (previousGuestCart) {
      let uniqueItem = ''
      for (let item of previousGuestCart) {
        if (item.id === selectProduct.data.id) {
          uniqueItem = item
        }
      }

      if (uniqueItem) {
        //delete the previos and add new item with quantity +1
        // let productObjQuantity = {
        //   productId: selectProduct.data.id,
        //   name: selectProduct.data.name,
        //   price: selectProduct.data.price,
        //   imageURL: selectProduct.data.image,
        //   category: selectProduct.data.category,
        //   description: selectProduct.data.description,
        //   inventory: selectProduct.data.inventory,
        //   quantity: uniqueItem.quantity + 1,
        // }
        let productObjQuantity = replaceProductQuantity(uniqueItem)
        //if cart has same item before
        dispatch(changeQuantity(productObjQuantity))
        // dispatch(addProduct(productObjQuantity))
      } else {
        //if no such item in non empty cart
        dispatch(addProduct(productObj))
      }
    } else {
      //if the cart is an empty array
      dispatch(addProduct(productObj))
    }
    //dispatch(addProduct(selectProduct.data))
  }
}

export const replaceProductQuantity = preExistItem => {
  return {
    productId: preExistItem.id,
    name: preExistItem.name,
    price: preExistItem.price,
    imageURL: preExistItem.image,
    category: preExistItem.category,
    description: preExistItem.description,
    inventory: preExistItem.inventory,
    quantity: preExistItem.quantity + 1
  }
}

//[{mirror},{mirror}]
const initialState = []
let newArr = ''
export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_CART:
      return action.guestCart
    case ADD_PRODUCT_TO_GUEST_CART:
      return [...state, action.product]
    case CHANGE_QUANTITY:
      console.log(state.guestCart)
      newArr = state.guestCart.map(item => {
        if (item.id === action.product.id) {
          item = action.product
          return item
        } else {
          return item
        }
      })
      return newArr
    default:
      return state
  }
}
