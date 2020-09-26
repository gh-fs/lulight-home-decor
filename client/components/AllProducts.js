import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  //name, image, description,button
  render() {
    const allProducts = this.props.allProducts
    return (
      <div>
        {allProducts.length ? (
          <div style={{backgroundColor: '#c3aed6'}}>
            <Container>
              <Row>
                {allProducts.map(product => {
                  return (
                    <Col key={product.id}>
                      <div style={{margin: '10px'}}>
                        <Card style={{width: '18rem'}}>
                          <Card.Img variant="top" src={product.image} />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                              Price: ${(product.price / 100).toFixed(2)}
                            </Card.Text>
                            <Button variant="dark">
                              <Link to={`/products/${product.id}`}>
                                See Details
                              </Link>
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </div>
        ) : (
          <div className="not-found">There are no products to display.</div>
        )}
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
