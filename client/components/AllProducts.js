import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Card, Button, Container, Row, Col} from 'react-bootstrap'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log(this.props)
  }

  //name, image,description,button
  render() {
    console.log(this.props.products)
    return (
      <div style={{backgroundColor: '#c3aed6'}}>
        <Container>
          <Row>
            {this.props.allProducts.map(product => {
              return (
                <Col key={product.id}>
                  <div style={{margin: '10px'}}>
                    <Card style={{width: '18rem'}}>
                      <Card.Img variant="top" src={product.image} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Button variant="primary">See detail</Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: function() {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
