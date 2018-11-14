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

class Feet extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: Dimensions.get('window').width * .5
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  renderItem = (data, index) => {
    return (
      <View>
        <Image
          style={{
            width: this.state.screenWidth,
            height: this.state.screenWidth,
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
          data={config.avatar.leg}
          renderItem={this.renderItem}
          sliderWidth={this.state.screenWidth}
          itemWidth={this.state.screenWidth}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({})

export default Feet;
