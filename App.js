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
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import ShortologyNews from './src/ShortologyNews'
import axios from 'axios'
import config from './src/config'
import RootReducer from './src/redux/RootReducer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(RootReducer)

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <ShortologyNews />
        </Provider>
      );
  }
}
