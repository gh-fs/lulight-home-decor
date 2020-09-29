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
  if (props.userID) {
    props.loadCart(props.userID)
  } else {
    props.loadGuestCart()
  }

  return (
    <div>
      <h3 className="heading">
        {email ? `Welcome, ${email}` : 'Welcome to Lulight'}
      </h3>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://lulightshop.com/wp-content/uploads/2019/10/il_fullxfull.1809648891_44dj-768x566.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="carousel-text">One of a kind light fixtures</h3>
            <p className="carousel-text">Handmade with reclaimed wood</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1799416707_31ce-768x548.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-text">Floating wall shelves</h3>
            <p className="carousel-text">Easy to assemble and mount</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://lulightshop.com/wp-content/uploads/2019/09/il_fullxfull.1838018577_jbjn-768x576.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-text">
              Industrial-inspired storage solutions
            </h3>
            <p className="carousel-text">Custom made with reclaimed piping</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
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
