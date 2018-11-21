import React, { Component } from 'react'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Video from 'react-native-video'
import config from '../config'

class PostContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width,
      paused: true,
      muted: false,
      buffering: true,
      animated: new Animated.Value(0)
    }

  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  playVideo = () => {
    this.setState(state => {
      return {
        paused: !state.paused
      }
    })
  }

  stopVideo = () => {
    // ferma il video
    this.setState({ paused: true })
  }

  handleBuffer = (meta) => {
    if (!meta.isBuffering) {
      this.setState({buffering: false})
    }
  }

  handleEnd = () => {
    this.videoPlayer.seek(0)
  }

  // Render
  render() {
    // Dynamic styles
    const imgSize = Math.floor(this.state.screenWidth - 16)
    const compStyles = StyleSheet.create({
      postImage: {
        width: imgSize,
        height: imgSize,
      }
    })

    let buffering = null
    if (this.state.buffering) {
      buffering = (
        <View style={styles.videoCover}>
          <ActivityIndicator
            size="large"
            color={config.colors.primary}
          />
        </View>
      )
    }

    let control = null
    if (this.state.paused) {
      control = (
        <View style={styles.videoCover}>
          <View style={styles.videoPlayBtn}>
            <Image source={config.icons.play} style={styles.videoPlayIcon}/>
          </View>
        </View>
      )
    }

    // Component
    let content = (
      <Image
        source={{ uri: this.props.post.full_img }}
        style={compStyles.postImage}
        resizeMode="contain"
      />
    )

    if (this.props.post.isvideo) {
      // Contenuto Video
      content = (
        <TouchableOpacity
          onPress={this.playVideo}
        >
          <Video
            source={{ uri: this.props.post.video }}
            style={compStyles.postImage}
            controls={false}
            fullscreen={false}
            ignoreSilentSwitch="obey"
            paused={this.state.paused}
            muted={this.state.muted}
            resizeMode="contain"
            ref={ref => this.videoPlayer = ref}
            onBuffer={this.handleBuffer}
            onEnd={this.handleEnd}
            onSeek={this.stopVideo}
            // poster={this.props.post.full_img}
          />
          {buffering}
          {control}
        </TouchableOpacity>
      )
    }

    return (
      <View style={[styles.contentContainer]}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: 'white',
    shadowColor: config.colors.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  videoPlayBtn: {
    width: 60,
    height: 60,
    backgroundColor: config.colors.black,
    opacity: 0.8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoPlayIcon: {
    width: 25,
    height: 25,
    marginLeft: 4,
    tintColor: '#fff',
  },
})

export default PostContent;
