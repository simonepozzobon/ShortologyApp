import React, { Component } from 'react'
import {
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { MainTemplate } from '../presentation'
import config from '../config'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width,
      username: '',
    }
  }

  // Component State Management
  componentWillMount() {
    AsyncStorage.getItem('user').then(userJson => {
      const user = JSON.parse(userJson)
      let capitalized = this.capitalizeFirstLetter(user.name)
      this.setState({username: capitalized})
    })
  }

  // Methods
  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    }
    catch(err) {
      return false
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goTo(route) {
    this.props.navigation.navigate(route)
  }

  logout = () => {
    console.log('LOGGED OUT')
    this.removeItemValue('token')
    this.removeItemValue('user')
    this.removeItemValue('email')
    this.removeItemValue('password')
    this.props.navigation.navigate('Auth')
  }

  // Render
  render() {
    // Dynamic styles
    const md = Math.floor(this.state.screenWidth / 2)
    const compStyles = StyleSheet.create({
      avatar: {
        width: md,
        height: md,
      }
    })

    // Component
    return (
      <MainTemplate title="My Shortology">
        <View style={{marginTop: 20}}>
          <Image
            style={compStyles.avatar}
            source={config.images.fakeAvatar}
          />
          <Text style={styles.username}>{this.state.username}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btnText} onPress={() => {this.goTo('')}}>
            <Text style={styles.btnTextStyle}>Liked</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {this.goTo('myAvatar')}}
          >
            <Text style={styles.btnTextStyle}>My Avatar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnGray}
            onPress={this.logout}>
            <Text style={styles.btnGrayText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </MainTemplate>

    );
  }
}

const styles = StyleSheet.create({
  username: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginTop: 25,
    fontSize: 24,
    color: config.colors.black,
  },

  btnText: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },

  btnTextStyle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    color: config.colors.black,
  },

  btnGray: {
    marginTop: 35,
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

export default withNavigation(Profile);
