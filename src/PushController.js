import React, { Component } from 'react'
import {
  AsyncStorage,
  PushNotificationIOS,
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import config from './config'
import axios from 'axios'

PushNotification.configure({
  onRegister: function(token) {
    // console.log( 'TOKEN:', token )


    AsyncStorage.getItem('user').then(userJson => {
      if (userJson) {
        let user = JSON.parse(userJson)

        let data = new FormData()
        data.append('token', token.token)
        data.append('user_id', user.id)
        data.append('os', token.os)

        axios.post(config.api.path + '/app/notifications/pair-device', data).then(response => {
          console.log('Abbiamo una registrazione', response);
        }).catch(err => {
          console.log('error', err)
        })
      }
    })



  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification )
    alert('notifica')
    // process the notification



    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  // senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
})

class PushController extends Component {
  constructor(props) {
    super(props)
    console.log(PushNotification)
  }

  componentDidMount() {}

  render() {
    return this.props.children
  }
}

export default PushController;
