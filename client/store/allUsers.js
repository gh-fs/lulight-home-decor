import axios from 'axios'

//action types
const SET_USERS = 'SET_USERS'

//action creators
const setUsers = users => ({
  type: SET_USERS,
  users
})

//thunk creators
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      const users = response.data
      const action = setUsers(users)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
