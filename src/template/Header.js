import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import config from '../config'

class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // Component State Management
  componentDidMount() {
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

    // Component
    if (this.props.title) {
      return (
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('home')}}>
            <Image source={config.images.logo}  style={styles.headerImage}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
          <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('login')}}>
            <Image source={config.images.defaultAvatar}  style={styles.headerImage}></Image>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('home')}}>
          <Image source={config.images.logo}  style={styles.headerImage}></Image>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('login')}}>
          <Image source={config.images.defaultAvatar}  style={styles.headerImage}></Image>
        </TouchableOpacity>
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
})

export default withNavigation(Header);
