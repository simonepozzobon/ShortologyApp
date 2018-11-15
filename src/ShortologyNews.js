import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native'

import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

// Screens
import {
  AuthLoading,
  HitParade,
  Home,
  ItsFriday,
  ItsMonday,
  Login,
  MyAvatar,
  MyAvatarColor,
  Profile,
  Register,
  SinglePost,
} from './screens'

// Navigation - Router
const AuthStack = createSwitchNavigator({
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  },
})

const AppStack = createSwitchNavigator({
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

  // Profile
  profile: {
    screen: Profile,
  },
  myAvatar: {
    screen: MyAvatar,
  },
  myAvatarColor: {
    screen: MyAvatarColor,
  },
}, {
  initialRouteName: 'hitParade',
})

const MainStack = createSwitchNavigator({

  AuthLoading: AuthLoading,
  App: AppStack,
  Auth: AuthStack,

}, {
  initialRouteName: 'AuthLoading',
})

class ShortologyNews extends Component {
  constructor() {
    super()
    this.state = {
      myKey: 'gianni'
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }
  render() {
    return <MainStack/>
  }
}

export default ShortologyNews;
