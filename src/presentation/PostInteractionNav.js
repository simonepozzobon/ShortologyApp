import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Share from 'react-native-share'
import config from '../config'

class PostInteractionNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: 0,
      commentCount: 0,
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {
    this.setState({
      likeCount: this.props.likeCount,
      commentCount: this.props.commentCount,
    })
  }

  // Methods
  likePost = () => {
    console.log('path per api', config.api.path + '/app/' + this.props.id + '/like-it')
    fetch(config.api.path + '/app/' + this.props.id + '/like-it')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          this.setState({ likeCount: responseJson.counts })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  sharePost = () => {
    const shareOptions = {
      title: 'Shortology',
      message: this.props.title,
      url: config.website + this.props.slug
    }

    Share.open(shareOptions)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }
  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    return (
      <View style={styles.shareNav}>
        <TouchableOpacity
          style={styles.btnImage}
          onPress={this.likePost}
        >
          <Image
            source={config.icons.heart}
            style={styles.btnIcon}
            resizeMode="contain"
          />
          <Text style={styles.counter}>{this.state.likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnImage}
          onPress={this.props.focusComment}
        >
          <Image
            source={config.icons.comment}
            style={styles.btnIcon}
            resizeMode="contain"
          />
          <Text style={styles.counter}>{this.props.commentCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnImage}
          onPress={this.sharePost}
        >
          <Image
            source={config.icons.share}
            style={styles.btnIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shareNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginVertical: 20,
  },

  btnImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },

  btnIcon: {
    width: 32,
    height: 32,
    tintColor: config.colors.black,
  },

  counter: {
    paddingLeft: 20,
    fontSize: 20,
  },
})

export default PostInteractionNav;
