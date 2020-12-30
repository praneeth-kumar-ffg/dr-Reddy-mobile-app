import { USER_LOGIN, USER_LOGOUT } from '../actions/actiionTypes'

const initialState = {
  username: '',
  password: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password
      }
    default:
      return state
  }
}