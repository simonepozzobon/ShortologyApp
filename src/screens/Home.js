import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import PushController from '../PushController'
import { withNavigation } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import config from '../config'
import { MainTemplate } from '../presentation'

class Home extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  constructor() {
    super()
    this.state = {}
  }

  // Component State Management
  componentDidMount() {}

  // Methods
  goTo(route) {
    this.props.navigation.navigate(route)
  }

  // Render
  render() {
    // Dynamic styles
    const height = Dimensions.get('window').height - 100
    const width = Dimensions.get('window').width

    let menuItemRatio = 2
    let smallMenuItemRatio = menuItemRatio * 2

    let menuItem = Math.floor(width / menuItemRatio)
    let smallMenuItem = Math.floor(width / smallMenuItemRatio)

    let totalMargin = (20 * 6)
    let totalSize = smallMenuItem + (menuItem * 2) + totalMargin

    while (totalSize >= height) {
      // Increase ratio
      menuItemRatio = menuItemRatio + 0.1
      smallMenuItemRatio = menuItemRatio * 2

      // New Item Size
      menuItem = Math.floor(width / menuItemRatio)
      smallMenuItem = Math.floor(width / smallMenuItemRatio)

      // Re-calculate total size
      totalSize = smallMenuItem + (menuItem * 2) + totalMargin
    }

    const compStyles = StyleSheet.create({
      menuItem: {
        width: menuItem,
        height: menuItem,
        margin: 20,
      },

      smallMenuItem: {
        width: smallMenuItem,
        height: smallMenuItem,
        marginTop: 20
      }
    })

    const itemOpacity = 0.7

    // Component
    return (
      <PushController>
        <MainTemplate title=" ">
          <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('itsMonday')}}>
            <Image source={config.images.itsMonday} style={compStyles.menuItem}></Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('itsFriday')}}>
            <Image source={config.images.itsFriday} style={compStyles.menuItem}></Image>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={itemOpacity} onPress={() => {this.goTo('hitParade')}}>
              <Image source={config.images.hitParade} style={compStyles.smallMenuItem}></Image>
            </TouchableOpacity>
          </View>
        </MainTemplate>
      </PushController>
    );
  }
}

const styles = StyleSheet.create({
  // Footer
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100+'%',
    marginBottom: 25,
  },

})

export default withNavigation(Home);
