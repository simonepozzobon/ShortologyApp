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

// Components
import SvgUri from 'react-native-svg-uri'
import config from '../config'

// Libraries
import { isIphoneX } from 'react-native-iphone-x-helper'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

// Calculate top margin of the header
let marginTop = 0
if (Platform.OS === 'ios') {
  if (isIphoneX()) {
    marginTop = 35
  } else {
    marginTop = 15
  }
}

// programmatic set style for the header
const compStyles = StyleSheet.create({
  iphone: {
    marginTop: marginTop
  }
})

// Responsive font size
const calculateFontSize = (size) => {
  return Math.round(config.utils.screenRatio * size)
}

class Header extends Component {
  constructor() {
    super()
  }

  // Methods
  goTo(route) {
    this.props.navigation.navigate(route)
  }

  // Render
  render() {
    const itemOpacity = 0.7

    let avatar = (
      <Image
        source={config.images.defaultAvatar}
        style={[styles.headerImage, compStyles.iphone]}
      />
    )

    if (this.props.user.avatar && this.props.user.avatar.type == 'svg') {
      avatar = (
        <SvgUri
          width={45}
          height={45}
          source={{ uri: this.props.user.avatar.url }}
          style={styles.svgHeader}
        />
      )
    } else if (this.props.user.avatar) {
      avatar = (
        <Image
          style={[styles.headerImageAv, compStyles.iphone]}
          source={{ uri: this.props.user.avatar.url }}
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

// replace to redux


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
    fontSize: calculateFontSize(15),
    textAlign: 'center',
  },

  headerImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },

  headerImageAv: {
    width: 45,
    height: 45,
    marginRight: 5,
    resizeMode: 'contain',
  },

  svgHeader: {
    marginRight: 5,
    height: 75,
    width: 75,
    resizeMode: 'contain',
    ...compStyles.iphone
  },
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(withNavigation(Header));
