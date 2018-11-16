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

import {
  getUser
} from '../redux/actions/UserActions'
import { connect } from 'react-redux'

import { MainTemplate } from '../presentation'
import axios from 'axios'
import config from '../config'
import PropTypes from 'prop-types'


class AuthLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width
    }

    this._bootstrapAsync()
  }

  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    }
    catch(err) {
      return false
    }
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
        console.log('token valido')
        this._validateToken(token)
      }  else {
        // user non è loggato
        console.log('token NON valido')
        this._reAuthenticateUser()
      }
    }).done()
  }

  _validateToken = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(config.api.path + '/app/user').then(response => {
      // formatta la risposta e la salva nel dispositivo
      const user = JSON.stringify(response.data)

      AsyncStorage.setItem('user', user).then(() => {
        this._redirectAuthorized()
      })

    }).catch(err => {
      // se non riesce a recuperare l'utente prova ad autenticarlo di nuovo
      this._reAuthenticateUser()
    })
  }

  _reAuthenticateUser = () => {
    console.log('nuovo tentativo di autenticazione')
    AsyncStorage.multiGet(['email', 'password'], (err, store) => {
      let email = store[0][1]
      let password = store[1][1]
      this._attemptLogin(email, password)
    })
  }

  _attemptLogin = (email, password) => {
    let data = new FormData()
    data.append('email', email)
    data.append('password', password)

    axios.post(config.api.path + '/login-mobile', data).then(response => {
      // user logged in
      if (response.data.success) {
        console.log('nuovo tentativo di autenticazione riuscito')
        const user = JSON.stringify(response.data.user)
        const token = response.data.token

        AsyncStorage.multiSet([
          ['user', user],
          ['token', token]
        ], () => {
          this._redirectAuthorized()
        })
      } else {
        // se il login non funziona l'utente dovrà loggarsi di nuovo manualmente
        console.log('nuovo tentativo di autenticazione NON riuscito')
        const remove = ['token', 'user', 'email', 'password']
        AsyncStorage.multiRemove(remove, () => {
          this._redirectUnauthorized()
        })
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

// AuthLoading.propTypes = {
//   getUser: PropTypes.func.isRequired,
//   randomPeople: PropTypes.object.isRequired
// }

const mapStateToProps = state => {
  return {
    randomPeople: state
  }
}
export default connect(mapStateToProps, { getUser })(AuthLoading);
