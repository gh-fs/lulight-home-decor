import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductById} from '../store/singleProduct'
import {addProductToServCart} from '../store/cart'
import {
  getCartFromLocalStorage,
  addProductToGuestCart
} from '../store/guestCart'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.addProductToGuestCart = this.addProductToGuestCart.bind(this)
  }
  async componentDidMount() {
    console.log('have user logged in?', this.props.user)
    await this.props.loadSingleProductInReact(this.props.match.params.id)
    if (!this.props.user.id) {
      //even no user will load guestcart?
      await this.props.loadGuestCart()

      console.log('no user, this is guest cart', this.props.guestCart)
    }
  }

  async addProductToGuestCart(productId) {
    console.log('before add new item : ', this.props.guestCart)

    await this.props.addProductToGuestCartInReact(productId)

    //steps:
    //1:add product to redux store
    //2:get guestCart with new add product (refreshedcart)
    //3:set localStorage.guestCart to JSON.parse(refreshedcart)
    //problem is this.props.guestCart is still empty after add product
    console.log('after add new item', this.props.guestCart)
    const currentProduct = await axios.get(`/api/products/${productId}`)
    const JSONready = JSON.stringify([...this.props.guestCart])
    localStorage.setItem('guestCart', JSONready)
  }

  render() {
    const product = this.props.singleProductInReact

    if (product.id) {
      const productPrice = (product.price / 100).toFixed(2)
      return (
        <div>
          <Card className="single-product" style={{width: '20rem'}}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                Description: {product.description}
                <br />
                <br />
                Price: ${productPrice}
              </Card.Text>
              {this.props.user.id ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.addProduct(product.id, this.props.user.id)
                  }}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    return this.addProductToGuestCart(product.id)
                  }}
                >
                  Add To Cart
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      )
    } else {
      return <div className="not-found">Product not found.</div>
    }
  }
}

const mapState = state => {
  return {
    singleProductInReact: state.singleProduct,
    user: state.user,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProductInReact: id => {
      dispatch(fetchSingleProductById(id))
    },
    addProduct: (productId, userId) => {
      dispatch(addProductToServCart(productId, userId))
    },
    loadGuestCart: () => {
      dispatch(getCartFromLocalStorage())
    },
    addProductToGuestCartInReact: productId => {
      dispatch(addProductToGuestCart(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
