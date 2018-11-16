/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import ShortologyNews from './src/ShortologyNews'
import axios from 'axios'
import config from './src/config'
// import { store } from './src/redux'

// const initialState = {
//   user: {},
// }

// const reducer = (state = initialState, action) => {
//
//   switch(action.type) {
//     case 'STORE_USER':
//
//       break
//     case 'GET_USER':
//       break
//   }
//   return state
// }
//
// const store = createStore(reducer)

export default class App extends Component {
  render() {
    return (
        <ShortologyNews />
      );
  }
}
