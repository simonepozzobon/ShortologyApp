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
  MyAvatar,
  MyAvatarColor,
  Profile,
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

  // Auth
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  },
}, {
  initialRouteName: 'myAvatarColor',
  initialRouteParams: {
    imageUri: 'http://shortologynew.test:89/storage/avatars/export/5becc180c4838.png'
  }
})

class ShortologyNews extends Component {
  render() {
    return <MainStack/>
  }
}

export default ShortologyNews;
