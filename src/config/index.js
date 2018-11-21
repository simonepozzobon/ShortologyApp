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
    logo: require('../../assets/commons/logo.png'),
    defaultAvatar: require('../../assets/commons/avatar.png'),
    fakeAvatar: require('../../assets/dev/avatar.png'),

    // Home Screen
    itsMonday: require('../../assets/home/its-monday.png'),
    itsFriday: require('../../assets/home/its-friday.png'),
    hitParade: require('../../assets/home/hit-parade.png'),

    // Auth
    loginAuth: require('../../assets/auth/login.png'),
  },

  icons: {
    heart: require('../../assets/commons/heart.png'),
    share: require('../../assets/commons/share.png'),
    comment: require('../../assets/commons/comment.png'),
    horizontalDots: require('../../assets/commons/horizontal-dots.png'),
    play: require('../../assets/commons/play.png'),
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
      { img: require('../../assets/avatar/heads/head_0.png') },
      { img: require('../../assets/avatar/heads/head_1.png') },
      { img: require('../../assets/avatar/heads/head_2.png') },
      { img: require('../../assets/avatar/heads/head_3.png') },
      { img: require('../../assets/avatar/heads/head_4.png') },
      { img: require('../../assets/avatar/heads/head_5.png') },
      { img: require('../../assets/avatar/heads/head_6.png') },
      { img: require('../../assets/avatar/heads/head_7.png') },
      { img: require('../../assets/avatar/heads/head_8.png') },
      { img: require('../../assets/avatar/heads/head_9.png') },
      { img: require('../../assets/avatar/heads/head_10.png') },
      { img: require('../../assets/avatar/heads/head_11.png') },
      { img: require('../../assets/avatar/heads/head_12.png') },
      { img: require('../../assets/avatar/heads/head_13.png') },
    ],
    body: [
      { img: require('../../assets/avatar/bodies/body_0.png') },
      { img: require('../../assets/avatar/bodies/body_1.png') },
      { img: require('../../assets/avatar/bodies/body_2.png') },
      { img: require('../../assets/avatar/bodies/body_3.png') },
      { img: require('../../assets/avatar/bodies/body_4.png') },
      { img: require('../../assets/avatar/bodies/body_5.png') },
      { img: require('../../assets/avatar/bodies/body_6.png') },
      { img: require('../../assets/avatar/bodies/body_7.png') },
      { img: require('../../assets/avatar/bodies/body_8.png') },
      { img: require('../../assets/avatar/bodies/body_9.png') },
    ],
    leg: [
      { img: require('../../assets/avatar/legs/leg_0.png') },
      { img: require('../../assets/avatar/legs/leg_1.png') },
      { img: require('../../assets/avatar/legs/leg_2.png') },
      { img: require('../../assets/avatar/legs/leg_3.png') },
      { img: require('../../assets/avatar/legs/leg_4.png') },
      { img: require('../../assets/avatar/legs/leg_5.png') },
      { img: require('../../assets/avatar/legs/leg_6.png') },
      { img: require('../../assets/avatar/legs/leg_7.png') },
      { img: require('../../assets/avatar/legs/leg_8.png') },
      { img: require('../../assets/avatar/legs/leg_9.png') },
    ],
  },

  hitParade: [
    { img: require('../../assets/hit-parade/hit_0.png') },
    { img: require('../../assets/hit-parade/hit_1.png') },
    { img: require('../../assets/hit-parade/hit_2.png') },
    { img: require('../../assets/hit-parade/hit_3.png') },
    { img: require('../../assets/hit-parade/hit_4.png') },
    { img: require('../../assets/hit-parade/hit_5.png') },
    { img: require('../../assets/hit-parade/hit_6.png') },
    { img: require('../../assets/hit-parade/hit_7.png') },
    { img: require('../../assets/hit-parade/hit_8.png') },
    { img: require('../../assets/hit-parade/hit_9.png') },
    { img: require('../../assets/hit-parade/hit_10.png') },
    { img: require('../../assets/hit-parade/hit_11.png') },
    { img: require('../../assets/hit-parade/hit_12.png') },
    { img: require('../../assets/hit-parade/hit_13.png') },
    { img: require('../../assets/hit-parade/hit_14.png') },
    { img: require('../../assets/hit-parade/hit_15.png') },
    { img: require('../../assets/hit-parade/hit_16.png') },
    { img: require('../../assets/hit-parade/hit_17.png') },
    { img: require('../../assets/hit-parade/hit_18.png') },
    { img: require('../../assets/hit-parade/hit_19.png') },
  ]
}
