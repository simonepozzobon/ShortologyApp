import React, { Component } from 'react'
import {
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
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods

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

    // Component
    let content
    if (this.props.post.isvideo) {
      // Contenuto Video
      content = (
        <View>
          <Video
            source={{ uri: this.props.post.video }}
            style={compStyles.postImage}
            controls={true}
            fullscreen={false}
            ignoreSilentSwitch="obey"
            paused={true}
            resizeMode="contain"
            // poster={this.props.post.full_img}
          />
        </View>
      )
    } else {
      // Contenuto Immagine
      content = (
        <Image
          source={{ uri: this.props.post.full_img }}
          style={compStyles.postImage}
          resizeMode="contain"
        />
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
})

export default PostContent;
