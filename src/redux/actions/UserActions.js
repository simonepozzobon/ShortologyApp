import axios from 'axios'

import {
  FETCHING_USER_REQUEST,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR,
} from './types'

export const fetchingUserRequest = () => ({
  type: FETCHING_USER_REQUEST
})

export const fetchingUserSuccess = (json) => ({
  type: FETCHING_USER_SUCCESS,
  payload: json
})

export const fetchingUserError = (error) => ({
  type: FETCHING_USER_REQUEST,
  payload: error
})

export const getUser = () => {
  return async dispatch => {
    // dispatch(fetchingUserRequest()) // show activity indicator
    // try {
    //   let response = await fetch('https://randomuser.me/api/?results=15')
    //   let json = await response.json()
    //   dispatch(fetchingUserSuccess(json.results))
    // } catch (error) {
    //   dispatch(fetchingUserError(error))
    // }

    // with axios
    dispatch(fetchingUserRequest()) // show activity indicator
    axios.get('https://randomuser.me/api/?results=15').then(response => {
      dispatch(fetchingUserSuccess(response.data))
    }).catch(error => {
      dispatch(fetchingUserError(error))
    })

  }
}
