import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log(this.props)
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return <div>{product.name}</div>
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state
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
