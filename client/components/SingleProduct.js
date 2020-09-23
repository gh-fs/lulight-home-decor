import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductById} from '../store/singleProduct'

class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleProductInREact(this.props.match.params.id)
  }

  render() {
    let product = this.props.singleProductInReact.singleProduct
    console.log(product)
    if (product) {
      return (
        <div>
          <h1>{product.name}</h1>
          <h3>{product.description}</h3>
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
