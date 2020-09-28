import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import {Table} from 'react-bootstrap'

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
              <div className="user-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Customer E-mail Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
