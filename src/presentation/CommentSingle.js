import React, { Component } from 'react'
import {
  Image,
  Platform,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { NativeModules } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import SvgUri from 'react-native-svg-uri'
import config from '../config'
import axios from 'axios'
// import moment from 'moment'
// import 'moment/min/moment-with-locales'
// const moment = require('moment/min/moment-with-locales')

const distanceInWordsToNow = require('date-fns/distance_in_words_to_now')


import { connect } from 'react-redux'

// Set locale based on platform
let locale = 'en_US'
if (Platform.OS === 'ios') {
  locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
} else if (Platform.OS == 'android'){
  locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
}

class CommentSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.comment.id,
      actionOpts: ['Reply', 'Report', 'cancel'],
      deleteIdx: 0,
      cancelIdx: 2,
      isAuthor: false,
    }
  }

  // Component State Management
  componentWillMount() {

    if (this.props.user.author.id == this.props.comment.author_id) {
      this.setState({
        actionOpts: ['Delete', 'cancel'],
        deleteIdx: 0,
        cancelIdx: 1,
        isAuthor: true,
      })
    }


  }
  componentDidMount() {}

  // Methods
  _capitalizedName() {
    let string = this.props.comment.author.authorable.name
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  _humanizeDate() {
    // moment.locale(locale)
    return distanceInWordsToNow(this.props.comment.created_at)
    // return 'moment rotto'
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  actionSheetPress = (index) => {
    if (this.state.isAuthor) {
      if (index == 0) {
        const author_id = this.props.user.author.id
        const comment_id = this.props.comment.id
        const url = config.api.path + '/app/comments/destroy/' + author_id + '/' + comment_id


        axios.get(url).then(response => {
          if (response.data.success) {
            this.props.deleteComment(response.data.deleted)
          }
        })
      }
    } else {
      switch (index) {
        case 0:
          // Reply
          this.props.focusComment(this.state.id)
          break

        case 1:
          // Report
          break
      }
    }
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component

    // Comment
    return (
      <View style={[styles.commentSingle, styles.shadows]}>
        <View style={styles.avatar}>
          <SvgUri
            width="50"
            height="50"
            source={{ uri: this.props.comment.author.avatar_url }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.topInfo}>
            <View style={styles.rightInfo}>
              <Text style={styles.name}>{this._capitalizedName()}</Text>
              <Text style={styles.date}> - {this._humanizeDate()}</Text>
            </View>
            <TouchableOpacity
              onPress={this.showActionSheet}
            >
              <Image
                source={config.icons.horizontalDots}
                style={styles.icon}
              />
            </TouchableOpacity>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              options={this.state.actionOpts}
              cancelButtonIndex={this.state.cancelIdx}
              destructiveButtonIndex={this.state.deleteIdx}
              onPress={this.actionSheetPress}
            />
          </View>
          <View>
            <Text>{this.props.comment.comment}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentSingle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: 14,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },

  shadows: {
    shadowColor: config.colors.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.01,
    shadowRadius: 4,
  },

  avatar: {
    paddingRight: 10,
  },

  content: {
    flexGrow: 1,
  },

  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 2,
  },

  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    color: config.colors.primary,
  },

  date: {
    color: config.colors.grayLight,
    marginRight: 20,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: config.colors.grayLight,
  },
})

export default CommentSingle;
