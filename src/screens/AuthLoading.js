import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import axios from 'axios'
import config from '../config'

class AuthLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width
    }
    this._bootstrapAsync()
  }

  _redirectAuthorized = () => {
    this.props.navigation.navigate('App')
  }

  _redirectUnauthorized = () => {
    this.props.navigation.navigate('Auth')
  }

  _bootstrapAsync = async () => {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        // c'è un token e va validato
        this._validateToken(token)
      }  else {
        // user non è loggato
        this._redirectUnauthorized()
      }
    }).done()
  }

  _validateToken = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(config.api.path + '/user').then(response => {

      // formatta la risposta e la salva nel dispositivo
      const user = JSON.stringify(response.data)
      AsyncStorage.setItem('user', user)
      this._redirectAuthorized()

    }).catch(err => {
      // se non riesce a recuperare l'utente prova ad autenticarlo di nuovo
      this._reAuthenticateUser()
    })
  }

  _reAuthenticateUser = () => {
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
        this._redirectAuthorized()

      } else {
        // se il login non funziona l'utente dovrà loggarsi di nuovo manualmente
        this.removeItemValue('token')
        this.removeItemValue('user')
        this.removeItemValue('email')
        this.removeItemValue('password')
        this._redirectUnauthorized()
      }
    })
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({
      logo: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: this.state.screenWidth * 0.5,
        height: this.state.screenWidth * 0.5,
      },

      companyName: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 'bold',
        color: config.colors.black,
      }
    })

    // Component
    return (
      <MainTemplate
        hideHeader={true}
        onlyBackground={true}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.headerblock}>
              <Image
                style={compStyles.logo}
                resizeMode="contain"
                resizeMethod="scale"
                source={config.images.logo}
              />
              <Text style={compStyles.companyName}>
                Shortology
              </Text>
            </View>
          </View>
          <View style={styles.loaderContainer}>
            <Text style={styles.loadingText}>
              Loading...
            </Text>
            <ActivityIndicator
              size="large"
              color={config.colors.primary}
            />
          </View>
          <View style={styles.footer}>
            <Text>Simone Pozzobon</Text>
          </View>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12
  },

  logoContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerblock: {
    alignItems: 'center',
  },

  loaderContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: config.colors.primary,
    opacity: 0.6,
    marginBottom: 20,
    fontSize: 16,
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AuthLoading;
