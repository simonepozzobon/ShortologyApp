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
import Swiper from 'react-native-swiper'

class Head extends Component {
  constructor() {
    super()
    this.state = {
      heads: config.avatar.head,
      itemWidth: Dimensions.get('window').width * .5
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
            width: this.state.itemWidth,
            height: this.state.itemWidth,
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

    const nextButton = (
      <TouchableOpacity>
        <Text style={[styles.buttonText, styles.rightBtn]}>›</Text>
      </TouchableOpacity>
    )
    const prevButton = <Text style={[styles.buttonText, styles.leftBtn]}>‹</Text>

    const numItems = config.avatar.head.length
    let animVal = new Animated.Value(0)

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {prevButton}
        <View style={{
          marginHorizontal: 40,
          width: this.state.itemWidth,
          borderWidth: 2,
          borderRadius: 5
        }}>
          <ScrollView
            horizontal
            centerContent
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
              )
            }
          >
            {config.avatar.head.map((item, index) => {
              return (
                <Animated.View style={{
                  width: this.state.itemWidth,
                  height: this.state.itemWidth
                }}>
                  <Image
                    style={{
                      width: this.state.itemWidth,
                      height: this.state.itemWidth,
                      resizeMode: 'contain',
                    }}
                    source={item.img}
                  />
                </Animated.View>
              )
            })}
          </ScrollView>
        </View>
        {nextButton}
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
