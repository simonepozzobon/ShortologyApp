import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import config from '../config'

class AuthLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width
    }
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const test = 'test'
  }
  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({
      logo: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: this.state.screenWidth * 0.5,
        height: this.state.screenWidth * 0.5,
        // backgroundColor: 'blue',
      },

      companyName: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 'bold',
        color: config.colors.black,
        // backgroundColor: 'green',
      }
    })

    // Component
    return (
      <MainTemplate
        hideHeader={true}
        onlyBackground={true}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.headerblock}>
              <Image
                style={compStyles.logo}
                resizeMode="contain"
                resizeMethod="scale"
                source={config.images.logo}
              />
              <Text style={compStyles.companyName}>
                Shortology
              </Text>
            </View>
          </View>
          <View style={styles.loaderContainer}>
            <Text style={styles.loadingText}>
              Loading...
            </Text>
            <ActivityIndicator
              size="large"
              color={config.colors.primary}
            />
          </View>
          <View style={styles.footer}>
            <Text>Simone Pozzobon</Text>
          </View>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 12
  },

  logoContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },

  headerblock: {
    alignItems: 'center',
    // backgroundColor: 'white',
  },

  loaderContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: config.colors.primary,
    opacity: 0.6,
    marginBottom: 20,
    fontSize: 16,
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AuthLoading;
