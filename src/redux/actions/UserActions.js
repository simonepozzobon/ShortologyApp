
import {
  SET_AVATAR,
  SET_USER,
  SET_TOKEN,
} from './types'

export const setAvatar = (avatar) => {
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}
