import React, { Component } from 'react'
import {
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { withNavigation } from 'react-navigation'
import SvgUri from 'react-native-svg-uri'
import config from '../config'

let marginTop = 15

const compStyles = StyleSheet.create({
  iphone: {
    ...ifIphoneX({
      marginTop: 35,
    }, {
      marginTop: 15,
    })
  }
})


class Header extends Component {
  constructor() {
    super()
    this.state = {
      avatar: null,
      avatarType: 'image'
    }
  }

  // Component State Management
  componentWillMount() {
    AsyncStorage.getItem('user').then(userJson => {
      const user = JSON.parse(userJson)
      this.setState({
        avatar: user.avatar.url,
        avatarType: user.avatar.type ? user.avatar.type : 'svg',
      })
    })
  }

  // Methods
  goTo(route) {
    this.props.navigation.navigate(route)
  }

  // Render
  render() {
    // Dynamic styles
    const itemOpacity = 0.7

    let avatar = (
      <Image
        source={config.images.defaultAvatar}
        style={[styles.headerImage, compStyles.iphone]}
      />
    )

    if (this.state.avatar && this.state.avatarType == 'svg') {
      avatar = (
        <SvgUri
          width={45}
          height={45}
          source={{ uri: this.state.avatar }}
          style={styles.svgHeader}
        />
      )
    } else if (this.state.avatar) {
      avatar = (
        <Image
          style={[styles.headerImageAv, compStyles.iphone]}
          source={{ uri: this.state.avatar }}
        />
      )
    }

    // Component
    if (this.props.title) {
      return (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={itemOpacity}
            onPress={() => {this.goTo('home')}}
          >
            <Image
              source={config.images.logo}
              style={[styles.headerImage, compStyles.iphone]}
            />
          </TouchableOpacity>
          <Text style={[styles.title, compStyles.iphone]}>{this.props.title}</Text>
          <TouchableOpacity
            activeOpacity={itemOpacity}
            onPress={() => {this.goTo('profile')}}
          >
            {avatar}
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('home')}}>
          <Image source={config.images.logo}  style={[styles.headerImage, compStyles.iphone]}></Image>
        </TouchableOpacity>
        {avatar}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
  },

  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    // marginTop: 35,
    fontSize: 18,
    textAlign: 'center',
  },

  headerImage: {
    // marginTop: 35,
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },

  headerImageAv: {
    // marginTop: 35,
    width: 50,
    height: 50,
    marginRight: 5,
    resizeMode: 'contain',
  },

  svgHeader: {
    // marginTop: 35,
    marginRight: 5,
    resizeMode: 'contain',
    ...compStyles.iphone
  },
})

export default withNavigation(Header);
