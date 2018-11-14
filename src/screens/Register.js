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

class Register extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: 0,
      name: '',
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

  register() {
    alert('attempt Register')
  }

  // Render
  render() {
    const width = Math.floor(this.state.screenWidth / 1.5)

    // Dynamic styles
    const compStyles = StyleSheet.create({
      formInput: {
        width: width,
        height: width,
      }
    })

    // Component
    return (
      <MainTemplate
        title="Register"
      >
        <View style={styles.content}>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              value={this.state.name}
              onChangeText={() => {}}
              placeholder="Your Name"
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>E-Mail</Text>
            <TextInput
              autoCorrect={false}
              value={this.state.email}
              onChangeText={() => {}}
              placeholder="email@domain.com"
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              value={this.state.password}
              secureTextEntry
              onChangeText={() => {}}
              placeholder="password"
              style={[compStyles.formInput, styles.input]}
            />
          </View>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => {this.register()}}>
            <Text style={styles.btnPrimaryText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>Already registered?</Text>
          <TouchableOpacity style={styles.btnGray} onPress={() => {this.goTo('login')}}>
            <Text style={styles.btnGrayText}>Login</Text>
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

export default withNavigation(Register);
