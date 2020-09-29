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
    console.log('product from db', selectProduct)
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
      //previous exit item
      let uniqueItem = {}
      for (let i = 0; i < previousGuestCart.length; i++) {
        let item = previousGuestCart[i]
        console.log(
          'previosu cart find matching item',
          item.productId,
          selectProduct.data.id
        )
        if (item.productId === selectProduct.data.id) {
          uniqueItem = item
        }
      }

      if (uniqueItem.productId) {
        //delete the previos and add new item with quantity +1
        let productObjQuantity = {
          productId: selectProduct.data.id,
          name: selectProduct.data.name,
          price: selectProduct.data.price,
          imageURL: selectProduct.data.image,
          category: selectProduct.data.category,
          description: selectProduct.data.description,
          inventory: selectProduct.data.inventory,
          quantity: uniqueItem.quantity + 1
        }

        console.log('thunk creator', productObjQuantity)
        //if cart has same item before
        dispatch(changeQuantity(productObjQuantity))
        // change quantity in localStorage?
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

export const decreaseQuantity = productId => {
  return dispatch => {
    let previousGuestCart = JSON.parse(localStorage.getItem('guestCart'))
    if (previousGuestCart) {
      //previous exit item
      let uniqueItem = {}
      for (let i = 0; i < previousGuestCart.length; i++) {
        let item = previousGuestCart[i]
        // console.log(
        //   'previosu cart find matching item',
        //   item.productId,
        //   selectProduct.data.id
        // )
        if (item.productId === productId) {
          uniqueItem = item
        }
      }
      if (uniqueItem.productId) {
        //delete the previos and add new item with quantity +1
        let productObjQuantity = {
          productId: uniqueItem.productId,
          name: uniqueItem.name,
          price: uniqueItem.price,
          imageURL: uniqueItem.image,
          category: uniqueItem.category,
          description: uniqueItem.description,
          inventory: uniqueItem.inventory,
          quantity: uniqueItem.quantity >= 1 ? uniqueItem.quantity - 1 : 0
        }
        dispatch(changeQuantity(productObjQuantity))
      }
    }
  }
}

export const deleteInGuestCart = productId => {
  return async dispatch => {
    let previousGuestCart = JSON.parse(localStorage.getItem('guestCart'))
    const stayInGuestCart = previousGuestCart.filter(item => {
      return item.productId !== productId
    })
    let JSONready = JSON.stringify(stayInGuestCart)
    localStorage.setItem('guestCart', JSONready)
    const previousCart =
      (await JSON.parse(localStorage.getItem('guestCart'))) || []
    dispatch(setGuestCart(previousCart))
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
      console.log(state)
      newArr = state.map(item => {
        if (item.productId === action.product.productId) {
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
