import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductById} from '../store/singleProduct'
import {Card, Button} from 'react-bootstrap'

class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleProductInReact(this.props.match.params.id)
  }

  render() {
    const product = this.props.singleProductInReact

    if (product.id) {
      const productPrice = (product.price / 100).toFixed(2)
      return (
        <div className="single-product">
          <Card style={{width: '30rem'}}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                Description: {product.description}
                <br />
                <br />
                Price: ${productPrice}
              </Card.Text>
              <Button variant="primary">Add To Cart</Button>
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
    singleProductInReact: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProductInReact: id => {
      dispatch(fetchSingleProductById(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
