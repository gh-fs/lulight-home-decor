import axios from 'axios'

let SET_GUEST_CART = 'SET_GUEST_CART'
let ADD_PRODUCT_TO_GUEST_CART = 'ADD_PRODUCT_TO_GUEST_CART'
let CHANGE_QUANTITY = 'CHANGE_QUANTITY'
let CLEAR_CART = 'CLEAR_CART'

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

const clearCart = emptyCart => ({
  type: CLEAR_CART,
  emptyCart
})

export const getCartFromLocalStorage = () => {
  return async dispatch => {
    const previousGuestCart =
      (await JSON.parse(localStorage.getItem('guestCart'))) || []
    dispatch(setGuestCart(previousGuestCart))
  }
}

export const addProductToGuestCart = productId => {
  return async dispatch => {
    const selectProduct = await axios.get(`/api/products/${productId}`)

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

    if (previousGuestCart) {
      // look for duplicate item in previous guest cart
      let duplicate = {}
      for (let i = 0; i < previousGuestCart.length; i++) {
        let currentItem = previousGuestCart[i]
        if (currentItem.productId === selectProduct.data.id) {
          duplicate = currentItem
        }
      }
      // if duplicate exists, delete the duplicate and replace with new item with quantity +1
      if (duplicate.productId) {
        let productObjQuantity = {
          productId: selectProduct.data.id,
          name: selectProduct.data.name,
          price: selectProduct.data.price,
          imageURL: selectProduct.data.image,
          category: selectProduct.data.category,
          description: selectProduct.data.description,
          inventory: selectProduct.data.inventory,
          quantity: duplicate.quantity + 1
        }

        // update in local storage
        let newLocalStorageCart = previousGuestCart.map(item => {
          if (item.productId === selectProduct.data.id) {
            return productObjQuantity
          } else {
            return item
          }
        })
        let JSONready = JSON.stringify(newLocalStorageCart)
        localStorage.setItem('guestCart', JSONready)

        // update in redux store
        dispatch(changeQuantity(productObjQuantity))
      } else {
        // if there are no duplicates, only update in redux store
        dispatch(addProduct(productObj))
      }
    } else {
      // if cart is empty, just add the new product
      dispatch(addProduct(productObj))
    }
  }
}

export const decreaseQuantity = productId => {
  return dispatch => {
    let previousGuestCart = JSON.parse(localStorage.getItem('guestCart'))
    if (previousGuestCart) {
      let duplicate = {}
      for (let i = 0; i < previousGuestCart.length; i++) {
        let currentItem = previousGuestCart[i]
        if (currentItem.productId === productId) {
          duplicate = currentItem
        }
      }

      if (duplicate.productId) {
        let productObjQuantity = {
          productId: duplicate.productId,
          name: duplicate.name,
          price: duplicate.price,
          imageURL: duplicate.imageURL,
          category: duplicate.category,
          description: duplicate.description,
          inventory: duplicate.inventory,
          quantity: duplicate.quantity >= 1 ? duplicate.quantity - 1 : 0
        }

        let newLocalStorageCart = previousGuestCart.map(item => {
          if (item.productId === productId) {
            return productObjQuantity
          } else {
            return item
          }
        })

        let JSONready = JSON.stringify(newLocalStorageCart)
        localStorage.setItem('guestCart', JSONready)

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

export const submitGuestOrder = guestOrder => {
  return async dispatch => {
    await axios.post('/api/orders', guestOrder)
    localStorage.setItem('guestCart', JSON.stringify([]))
    dispatch(clearCart([]))
  }
}

const initialState = []
let newArr = ''
export default function guestCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_CART:
      return action.guestCart
    case ADD_PRODUCT_TO_GUEST_CART:
      return [...state, action.product]
    case CHANGE_QUANTITY:
      newArr = state.map(item => {
        if (item.productId === action.product.productId) {
          item = action.product
          return item
        } else {
          return item
        }
      })
      return newArr
    case CLEAR_CART:
      return action.emptyCart
    default:
      return state
  }
}
