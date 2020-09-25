import React, {Component} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class PaymentInfo extends Component {
  componentDidMount() {
    //get the subtotal and update payment amount
  }
  render() {
    return (
      <div>
        <Container style={{margin: '20px 20% 10px 20% '}}>
          <h1>Your payment amount is $100</h1>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
              <br />
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <br />
              <Form.Label>Your address</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
              <br />
              <Form.Label>Credit card Number</Form.Label>
              <Form.Control type="number" placeholder="creadit card number" />
              <br />
              <Form.Label>Name on the card</Form.Label>
              <Form.Control type="text" placeholder="creadit card number" />
              <br />
              <Form.Label>expiration date</Form.Label>
              <Form.Control type="date" />
              <br />
              <Form.Label>CVV</Form.Label>
              <Form.Control type="number" />
              <br />
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="number" />
              <Form.Check type="checkbox" label="Agree with our terms" />

              <Button variant="success">
                <Link to="/thankyou">Sumbit</Link>
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

export default PaymentInfo
