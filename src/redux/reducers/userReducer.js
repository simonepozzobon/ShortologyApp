import {
  FETCHING_USER_REQUEST,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR
} from '../actions/types'

const initialState = {
  isFetching: false,
  errorMessage: '',
  users: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCHING_USER_REQUEST:
      return { ...state, isFetching: true }

    case FETCHING_USER_SUCCESS:
      return { ...state, isFetching: false, users: action.payload }

    case FETCHING_USER_ERROR:
      return { ...state, errorMessage: action.payload }

    default:
      return state
  }
}

export default userReducer
