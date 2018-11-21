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
import SvgUri from 'react-native-svg-uri'
import config from '../config'

const calculateFontSize = (size) => {
  return Math.round(config.utils.screenRatio * size)
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width,
      username: '',
      avatar: null,
      avatarType: 'image',
      user: {}
    }
  }

  // Component State Management
  componentWillMount() {
    AsyncStorage.getItem('user').then(userJson => {
      const user = JSON.parse(userJson)
      let capitalized = this.capitalizeFirstLetter(user.name)

      console.log(user)
      this.setState({
        username: capitalized,
        avatar: user.avatar.url,
        avatarType: user.avatar.type ? user.avatar.type : 'svg',
        user: user,
      })
    })
  }

  // Methods
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goTo(route) {
      this.props.navigation.navigate(route)
  }

  logout = () => {
    console.log('LOGGED OUT')
    const remove = ['token', 'user', 'email', 'password']
    AsyncStorage.multiRemove(remove, () => {
      this.props.navigation.navigate('Auth')
    })
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

    let avatar = (
      <Image
        style={compStyles.avatar}
        source={config.images.fakeAvatar}
      />
    )

    if (this.state.avatar && this.state.avatarType == 'svg') {
      avatar = (
        <SvgUri
          width={md}
          height={md}
          source={{ uri: this.state.avatar }}
        />
      )
    } else if (this.state.avatar) {
      avatar = (
        <Image
          style={compStyles.avatar}
          source={{uri: this.state.avatar}}
        />
      )
    }

    // Component
    return (
      <MainTemplate title="My Shortology">
        <View style={{marginTop: 20}}>
          {avatar}
          <Text style={styles.username}>{this.state.username}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btnText} onPress={() => {this.goTo('userFavourited')}}>
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
    fontSize: calculateFontSize(20.5),
    color: config.colors.black,
    marginBottom: 36,
  },

  btnText: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTextStyle: {
    fontFamily: 'Montserrat',
    fontSize: calculateFontSize(14),
    fontWeight: 'bold',
    color: config.colors.black,
  },

  btnGray: {
    marginTop: 36,
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
