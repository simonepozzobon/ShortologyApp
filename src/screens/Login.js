import React, { Component } from 'react'
import {
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { MainTemplate } from '../presentation'
import config from '../config'
import axios from 'axios'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: 0,
      email: '',
      password: '',
    }
  }

  // Component State Management
  componentDidMount() {
    this.setState({screenWidth: Dimensions.get('window').width})
  }

  // Methods
  goTo(route) {
    this.props.navigation.navigate(route)
  }

  attemptLogin = () => {
    if (this.state.email && this.state.password) {
      console.log('tentativo di login')
      let data = new FormData()
      data.append('email', this.state.email)
      data.append('password', this.state.password)

      axios.post(config.api.path + '/login', data)
        .then(response => {
          // user logged in
          if (response.data.success) {
            console.log('login riuscito')

            // Salva il token
            AsyncStorage.setItem('token', response.data.token)

            // Salva l'utente
            const user = JSON.stringify(response.data.user)
            AsyncStorage.setItem('user', user)

            // Salva email
            AsyncStorage.setItem('email', this.state.email)

            // Salva password
            AsyncStorage.setItem('password', this.state.password)

            this.props.navigation.navigate('App')
          } else {
            console.log('dati sbagliati')
            this.setState({password: ''})
          }
        })
    } else {
      alert('Fill the form')
    }
  }

  emailSet = (value) => {
    this.setState({email: value})
  }

  passwordSet = (value) => {
    this.setState({password: value})
  }

  focusToPassword = () => {
    this.passwordInput.focus()
  }

  // Render
  render() {
    const lg = Math.floor(this.state.screenWidth / 1.5)
    const md = Math.floor(this.state.screenWidth / 2)

    // Dynamic styles
    const compStyles = StyleSheet.create({
      image: {
        width: md,
        height: md,
        marginBottom: 20,
      },

      formInput: {
        width: lg,
        height: lg,
      }
    })

    // Component
    return (
      <MainTemplate title="Login" hideHeader={true}>
        <View style={styles.content}>
          <Image source={config.images.loginAuth} style={compStyles.image}></Image>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>E-Mail</Text>
            <TextInput
              autoCorrect={false}
              value={this.state.email}
              placeholder="email@domain.com"
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={this.emailSet}
              onSubmitEditing={this.focusToPassword}
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              autoCorrect={false}
              value={this.state.password}
              placeholder="password"
              returnKeyType="send"
              onChangeText={this.passwordSet}
              onSubmitEditing={this.attemptLogin}
              ref={ref => this.passwordInput = ref}
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={this.attemptLogin}
          >
            <Text style={styles.btnPrimaryText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text>Not registered yet?</Text>
            <TouchableOpacity style={styles.btnGray} onPress={() => {this.goTo('register')}}>
              <Text style={styles.btnGrayText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },

  // Images


  // Forms
  formInput: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 10,
  },

  // Button
  btnPrimary: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: config.colors.primary,
  },

  btnPrimaryText: {
    color: config.colors.primary,
  },

  btnGray: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: config.colors.gray,
  },

  btnGrayText: {
    color: config.colors.gray,
  }
})

export default withNavigation(Login);
