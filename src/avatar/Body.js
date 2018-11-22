import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import config from '../config'
import Carousel from 'react-native-snap-carousel'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: Dimensions.get('window').width * .6
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  setBody = (index) => {
    this.props.setBody(index)
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

    // Component
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Carousel
          data={config.avatar.body}
          renderItem={this.renderItem}
          sliderWidth={this.props.size}
          itemWidth={this.props.size}
          onSnapToItem={this.setBody}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: config.colors.black,
    fontSize: 40,
  },

  buttonWrapperStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 1,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

export default Body;
