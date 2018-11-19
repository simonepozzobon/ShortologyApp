import React, { Component } from 'react'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  onRegister: function(token) {
    console.log( 'TOKEN:', token )
    alert('registered', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification )

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

  componentDidMount() {
    // PushNotification.unregister()
    // PushNotification.abandonPermissions()
    alert('reset')
    // Set badge notification
    // PushNotification.setApplicationIconBadgeNumber(5)

  }

  render() {
    return this.props.children
  }
}

export default PushController;
