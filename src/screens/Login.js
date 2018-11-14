import React, { Component } from 'react'
import {
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

  getMail() {}

  getPassword() {}

  attemptLogin() {
    alert('attempt Login')
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
      <MainTemplate
        title="Login"
      >
        <View style={styles.content}>
          <Image source={config.images.loginAuth} style={compStyles.image}></Image>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>E-Mail</Text>
            <TextInput
              autoCorrect={false}
              value={this.state.password}
              onChangeText={() => {}}
              placeholder="email@domain.com"
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              autoCorrect={false}
              value={this.state.password}
              onChangeText={() => {}} autoFocus={true}
              placeholder="password"
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => {this.attemptLogin()}}>
            <Text style={styles.btnPrimaryText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>Not registered yet?</Text>
          <TouchableOpacity style={styles.btnGray} onPress={() => {this.goTo('register')}}>
            <Text style={styles.btnGrayText}>Register</Text>
          </TouchableOpacity>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100+'%',
    marginBottom: 25,
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
