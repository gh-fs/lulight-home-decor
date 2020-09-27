import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const PaymentInfo = props => {
  const {sub} = props.location.state
  return (
    <div>
      <Container style={{margin: '20px 20% 10px 20% '}}>
        <h1>Total payment due: {sub}</h1>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
            <br />
            <Form.Label>E-mail address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <br />
            <Form.Label>Billing address</Form.Label>
            <Form.Control type="text" placeholder="Enter mailing address" />
            <br />
            <Form.Label>Credit card number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter credit card number"
            />
            <br />
            <Form.Label>Name on credit card</Form.Label>
            <Form.Control type="text" placeholder="Enter name on credit card" />
            <br />
            <Form.Label>Expiration date</Form.Label>
            <Form.Control type="date" />
            <br />
            <Form.Label>CVV</Form.Label>
            <Form.Control type="number" />
            <br />
            <Form.Label>Zip code</Form.Label>
            <Form.Control type="number" />
            <Form.Check
              type="checkbox"
              label="I agree with the terms of purchase"
            />

            <Button variant="dark">
              <Link to="/thankyou">Submit</Link>
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default PaymentInfo
