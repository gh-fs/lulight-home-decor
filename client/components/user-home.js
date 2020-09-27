import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Carousel} from 'react-bootstrap'
import {getCartFromServer} from '../store/cart'
import {getCartFromLocalStorage} from '../store/guestCart'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('props in home page', props)
  if (props.userID) {
    props.loadCart(props.userID)
  } else {
    props.loadGuestCart()
  }

  if (email) {
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1809648891_44dj-768x566.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.2023660545_8mrr-768x576.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1761029854_gi9o-768x455.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Welcome to Lulight</h1>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1809648891_44dj-768x566.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 />
              <p>Checkout our latest products from the Navbar</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1761029854_gi9o-768x455.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 />
              <p />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1952446239_kh3t-768x768.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 />
              <p />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userID: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadCart: function(userId) {
      dispatch(getCartFromServer(userId))
    },
    loadGuestCart: function() {
      dispatch(getCartFromLocalStorage())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
