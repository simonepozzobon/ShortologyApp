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

import ShortologyNews from './src/ShortologyNews'
import axios from 'axios'
import config from './src/config'

export default class App extends Component {
  render() {
    return (
        <ShortologyNews />
      );
  }
}
