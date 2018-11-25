import { Dimensions } from 'react-native'

export default {
  // api
  api: {
    path: 'https://shortology.it/api'
  },

  website: 'https://shortology.it',


  // Images
  images: {
    // Commons
    logo: { uri: 'logo' },
    defaultAvatar: { uri: 'avatar' },
    fakeAvatar: require('../../assets/dev/avatar.png'),

    // Home Screen
    itsMonday: { uri: 'its_monday' },
    itsFriday: { uri: 'its_friday' },
    hitParade: { uri: 'hit_parade' },

    // Auth
    loginAuth: { uri: 'login' },
  },

  icons: {
    heart: { uri: 'heart' },
    share: { uri: 'share' },
    comment: { uri: 'comment' },
    horizontalDots: { uri: 'horizontal_dots' },
    play: { uri: 'play' },
  },

  // Colors
  colors: {
    black: '#333333',
    primary: '#F07879',
    yellow: '#F9F2A8',
    blue: '#D2ECFB',
    postsBlue: '#d9edec',
    purple: '#CEBCDD',
    pink: '#F6B498',
    gray: '#7F7F7F',
    grayLight: '#a8a8a8',
  },

  gridColumns: 3,

  // Styles constants
  styleConst: {
    bgBlue: {},
    container: {},
  },

  utils: {
    screenRatio: Dimensions.get('window').width / 320,
  },

  avatar: {
    head: [
      { img: { uri: 'head_0' } },
      { img: { uri: 'head_1' } },
      { img: { uri: 'head_2' } },
      { img: { uri: 'head_3' } },
      { img: { uri: 'head_4' } },
      { img: { uri: 'head_5' } },
      { img: { uri: 'head_6' } },
      { img: { uri: 'head_7' } },
      { img: { uri: 'head_8' } },
      { img: { uri: 'head_9' } },
      { img: { uri: 'head_10' } },
      { img: { uri: 'head_11' } },
      { img: { uri: 'head_12' } },
      { img: { uri: 'head_13' } },
    ],
    body: [
      { img: { uri: 'body_0' } },
      { img: { uri: 'body_1' } },
      { img: { uri: 'body_2' } },
      { img: { uri: 'body_3' } },
      { img: { uri: 'body_4' } },
      { img: { uri: 'body_5' } },
      { img: { uri: 'body_6' } },
      { img: { uri: 'body_7' } },
      { img: { uri: 'body_8' } },
      { img: { uri: 'body_9' } },
    ],
    leg: [
      { img: { uri: 'leg_0' } },
      { img: { uri: 'leg_1' } },
      { img: { uri: 'leg_2' } },
      { img: { uri: 'leg_3' } },
      { img: { uri: 'leg_4' } },
      { img: { uri: 'leg_5' } },
      { img: { uri: 'leg_6' } },
      { img: { uri: 'leg_7' } },
      { img: { uri: 'leg_8' } },
      { img: { uri: 'leg_9' } },
    ],
  },

  hitParade: [
    { img: { uri: 'hit_0' } },
    { img: { uri: 'hit_1' } },
    { img: { uri: 'hit_2' } },
    { img: { uri: 'hit_3' } },
    { img: { uri: 'hit_4' } },
    { img: { uri: 'hit_5' } },
    { img: { uri: 'hit_6' } },
    { img: { uri: 'hit_7' } },
    { img: { uri: 'hit_8' } },
    { img: { uri: 'hit_9' } },
    { img: { uri: 'hit_10' } },
    { img: { uri: 'hit_11' } },
    { img: { uri: 'hit_12' } },
    { img: { uri: 'hit_13' } },
    { img: { uri: 'hit_14' } },
    { img: { uri: 'hit_15' } },
    { img: { uri: 'hit_16' } },
    { img: { uri: 'hit_17' } },
    { img: { uri: 'hit_18' } },
    { img: { uri: 'hit_19' } },
  ]
}
