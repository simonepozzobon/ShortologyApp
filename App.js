/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View
} from 'react-native'

import ShortologyNews from './src/ShortologyNews'
import axios from 'axios'
import config from './src/config'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    }
    catch(err) {
      console.log(err)
      return false
    }
  }

  validateUser = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(config.api.path + '/user').then(response => {

      // formatta la risposta e la salva nel dispositivo
      const user = JSON.stringify(response.data)
      AsyncStorage.setItem('user', user)

    }).catch(err => {
      // se non riesce a recuperare l'utente prova ad autenticarlo di nuovo
      this.reAuthenticateUser()
    })
  }

  reAuthenticateUser = () => {
    const email = AsyncStorage.getItem('email')
    const password = AsyncStorage.getItem('password')

    let data = new FormData()
    data.append('email', email)
    data.append('password', password)

    axios.post(config.api.path + '/login', data).then(response => {
      // user logged in
      if (response.data.success) {

        // Salva il token
        AsyncStorage.setItem('token', response.data.token)

        // Salva l'utente
        const user = JSON.stringify(response.data.user)
        AsyncStorage.setItem('user', user)

        // Salva email
        AsyncStorage.setItem('email', this.state.email)

        // Salva password
        AsyncStorage.setItem('password', this.state.password)

      } else {
        // se il login non funziona l'utente dovrà loggarsi di nuovo manualmente
        this.removeItemValue('token')
        this.removeItemValue('user')
        this.removeItemValue('email')
        this.removeItemValue('password')
      }
    })
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        // c'è un token e va validato
        this.validateUser(token)
      }  else {
        // user non è loggato
      }
    }).done()
  }

  render() {
    return (
        <ShortologyNews />
      );
  }
}
