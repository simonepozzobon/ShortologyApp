import React, { Component } from 'react'
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import SvgUri from 'react-native-svg-uri'
import config from '../config'

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
        avatarType: 'svg',
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
    const compStyles = StyleSheet.create({})

    const itemOpacity = 0.7

    let avatar = (
      <Image
        source={config.images.defaultAvatar}
        style={styles.headerImage}
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
          style={compStyles.avatar}
          source={{uri: this.state.avatar}}
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
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
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
          <Image source={config.images.logo}  style={styles.headerImage}></Image>
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
    marginTop: 35,
    fontSize: 18,
  },

  headerImage: {
    marginTop: 35,
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },

  svgHeader: {
    marginTop: 35,
    resizeMode: 'contain',
  }
})

export default withNavigation(Header);
