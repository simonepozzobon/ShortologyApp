import React, { Component } from 'react'
import {
  StyleSheet,
} from 'react-native'

import { createSwitchNavigator } from 'react-navigation'

// Screens
import {
  HitParade,
  Home,
  ItsFriday,
  ItsMonday,
  Login,
  Register,
  SinglePost,
} from './screens'

// Navigation - Router
const MainStack = createSwitchNavigator({
  home: {
    screen: Home,
  },

  // Post Lists
  itsFriday: {
    screen: ItsFriday,
  },
  itsMonday: {
    screen: ItsMonday,
  },
  hitParade: {
    screen: HitParade,
  },

  // Post Single
  singlePost: {
    screen: SinglePost,
  },

  // Auth
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  },
}, {
  initialRouteName: 'register',
})

class ShortologyNews extends Component {
  render() {
    return <MainStack/>
  }
}

export default ShortologyNews;
