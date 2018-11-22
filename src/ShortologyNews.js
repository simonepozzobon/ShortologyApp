import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native'

import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

// Screens
import {
  AuthLoading,
  ConfirmEmail,
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
  UserFavourited,
} from './screens'

// Navigation - Router
const AuthStack = createSwitchNavigator({
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  },
  confirmEmail: {
    screen: ConfirmEmail,
  },
}, {
  initialRouteName: 'login'
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
  userFavourited: {
    screen: UserFavourited
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
  initialRouteName: 'profile',
})

const MainStack = createSwitchNavigator({

  AuthLoading: AuthLoading,
  App: AppStack,
  Auth: AuthStack,

}, {
  initialRouteName: 'AuthLoading',
})

class ShortologyNews extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {

  }
  render() {
    return (
        <MainStack/>
    )
  }
}

export default ShortologyNews;
