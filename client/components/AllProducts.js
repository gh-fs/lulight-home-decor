import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log(this.props)
  }

  render() {
    console.log(this.props.products)
    return (
      <div>
        {this.props.allProducts.map(product => {
          return <div key={product.id}>{product.name}</div>
        })}
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
