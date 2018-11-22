import {
  SET_MONDAY,
  SET_FRIDAY,
  SET_HIT_PARADE,
} from './types'


export const setMonday = (posts) => {
  return {
    type: SET_MONDAY,
    payload: posts
  }
}

export const setFriday = (posts) => {
  return {
    type: SET_FRIDAY,
    payload: posts
  }
}

export const setHitParade = (posts) => {
  return {
    type: SET_HIT_PARADE,
    payload: posts
  }
}
