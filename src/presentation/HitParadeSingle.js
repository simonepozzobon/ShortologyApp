import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import config from '../config'


const calculateFontBase = (size) => {
  return Math.round(size / config.utils.screenRatio)
}

const calculateFontSize = (size) => {
  return Math.round(config.utils.screenRatio * size)
}

console.log('diventa ->', calculateFontBase(9), 'da ->', calculateFontSize(8))

class HitParadeSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goTo = () => {
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
    return (
      <TouchableOpacity
        onPress={this.goTo}
        style={styles.container}
      >
        <Image
          style={{
            width: this.props.itemWidth,
            height: this.props.itemWidth
          }}
          source={{uri: this.props.post.img}}
        />
        <View style={styles.infoContainer}>
          <Image
            style={{
              flex: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: this.props.itemWidth * 0.5,
              height: this.props.itemWidth * 0.5,
            }}
            resizeMode="contain"
            resizeMethod="scale"
            source={config.hitParade[this.props.index].img}
          />
          <Text style={styles.title}>{this.props.post.title}</Text>
          <Text style={styles.votes}>
            [  <Text style={{fontWeight: 'normal', fontSize: calculateFontSize(9)}}>{this.props.post.likes_count} Votes</Text>  ]
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10,
    backgroundColor: config.colors.postsBlue,
  },

  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Montserrat',
    fontSize: calculateFontSize(11),
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  votes: {
    fontWeight: 'bold',
  }
})

export default withNavigation(HitParadeSingle);
