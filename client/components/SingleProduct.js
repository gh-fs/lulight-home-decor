import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductById} from '../store/singleProduct'
import {Card, Button} from 'react-bootstrap'

class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleProductInREact(this.props.match.params.id)
  }

  render() {
    let product = this.props.singleProductInReact.singleProduct
    console.log(product)
    if (product) {
      return (
        <div className="single-product">
          {/* <h1>{product.name}</h1>
          <h3>{product.description}</h3> */}
          <Card style={{width: '30rem'}}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.description}
                <div>Price: ${product.price}</div>
              </Card.Text>
              <Button variant="primary">Add To Cart</Button>
            </Card.Body>
          </Card>
        </div>
      )
    } else {
      return <div>NO Product</div>
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
    loadSingleProductInREact: id => {
      dispatch(fetchSingleProductById(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
