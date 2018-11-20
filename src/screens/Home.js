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
    this.state = {
      screenWidth: 0
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

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({
      menuItem: {
        width: Math.floor(this.state.screenWidth / 2),
        height: Math.floor(this.state.screenWidth / 2),
        margin: 20,
      },

      smallMenuItem: {
        width: Math.floor(this.state.screenWidth / 4),
        height: Math.floor(this.state.screenWidth / 4),
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
