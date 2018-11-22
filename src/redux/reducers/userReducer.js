import {
  SET_AVATAR,
  SET_USER,
  SET_TOKEN,
} from '../actions/types'

const initialState = {
  avatar: {},
  user: {},
  token: null,
  loading: true,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_AVATAR:
      return { ...state, avatar: action.payload }

    case SET_USER:
      return { ...state, user: action.payload }

    case SET_TOKEN:
      return { ...state, token: action.payload }

    default:
      return state
  }
}
