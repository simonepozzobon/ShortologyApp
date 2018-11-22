import {
  SET_MONDAY,
  SET_FRIDAY,
  SET_HIT_PARADE,
} from '../actions/types'

const initialState = {
  itsFriday: [],
  itsMonday: [],
  hitParade: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MONDAY:
      return { ...state, itsMonday: action.payload }

    case SET_FRIDAY:
      return { ...state, itsFriday: action.payload }

    case SET_HIT_PARADE:
      return { ...state, hitParade: action.payload }

    default:
      return state
  }
}
