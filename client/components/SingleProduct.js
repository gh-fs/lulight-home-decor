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
    await this.props.loadSingleProductInReact(this.props.match.params.id)
    if (!this.props.user.id) {
      await this.props.loadGuestCart()
    }
  }

  async addProductToGuestCart(productId) {
    await this.props.addProductToGuestCartInReact(productId)

    // NOT SURE WHAT THIS DOES - BUT DO NOT REMOVE
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
                <div>
                  Status: {product.inventory > 0 ? 'In stock' : 'Unavailable'}
                </div>
                Price: ${productPrice}
              </Card.Text>
              {this.props.user.id ? (
                <Button
                  variant="dark"
                  onClick={() => {
                    this.props.addProduct(product.id, this.props.user.id)
                  }}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  variant="dark"
                  size="sm"
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
