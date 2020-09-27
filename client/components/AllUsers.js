import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    const allUsers = this.props.allUsers
    return (
      <div>
        {this.props.isAdmin ? (
          <div>
            {allUsers.length ? (
              <div>
                <h1> Here is a list of all users: </h1>
                {allUsers.map(user => {
                  return (
                    <li key={user.id}>
                      Customer ID: {user.id} - Email: {user.email}
                    </li>
                  )
                })}
              </div>
            ) : (
              <div className="not-found">There are no users to display.</div>
            )}
          </div>
        ) : (
          <div className="not-found">
            You are not authorized to view this page
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isAdmin: state.user.isAdmin,
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: function() {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
