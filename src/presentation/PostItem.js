import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'

class PostItem extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // Component State Management
  componentDidMount() {
    // this.setState()
  }

  // Methods
  goTo() {
    if (this.props.post.slug && this.props.post.slug.slug) {
      this.props.navigation.navigate('singlePost', {
        slug: this.props.post.slug.slug,
        next: this.props.next,
        prev: this.props.prev,
        idx: this.props.idx,
        count: this.props.length
      })
    } else {
      console.log('il post non ha uno slug')
    }
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    if (this.props.post.empty) {
      // render empty object
      return <View style={styles.postSingle}/>
    }

    return (
      <TouchableOpacity
        onPress={() => {this.goTo()}}
        style={styles.postSingle}
      >
        <Image
          source={{uri: this.props.post.img}}
          style={{ flex: 1, alignSelf: 'stretch' }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  postSingle: {
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 4,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  }
})

export default withNavigation(PostItem);
