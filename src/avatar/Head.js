import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import config from '../config'
import Carousel, { Pagination } from 'react-native-snap-carousel'

class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heads: config.avatar.head,
      screenWidth: Dimensions.get('window').width * .4
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  setHead = (index) => {
    this.props.setHead(index)
  }

  renderItem = (data, index) => {
    return (
      <View>
        <Image
          style={{
            width: this.props.size,
            height: this.props.size,
            resizeMode: 'contain'
          }}
          source={data.item.img}
        />
      </View>
    )
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Carousel
          data={config.avatar.head}
          renderItem={this.renderItem}
          sliderWidth={this.props.size}
          itemWidth={this.props.size}
          onSnapToItem={this.setHead}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  buttonText: {
    color: config.colors.black,
    fontSize: 40,
  },

  buttonWrapperStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftBtn: {
    // marginLeft: -50,
  },

  rightBtn: {
    // marginLeft: 50,
  },
})

export default Head;
