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
import Swiper from 'react-native-swiper'

class Body extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: Dimensions.get('window').width * .6
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

    // const nextButton = <Text style={styles.buttonText}>›</Text>
    // const prevButton = <Text style={styles.buttonText}>‹</Text>

    // Component
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Carousel
          data={config.avatar.body}
          renderItem={this.renderItem}
          sliderWidth={this.state.screenWidth}
          itemWidth={this.state.screenWidth}
        />
      </View>
    );
    // return (
    //   <View style={{ marginHorizontal: 40 }}>
    //     <Swiper
    //       showsButtons={true}
    //       showsPagination={false}
    //       automaticallyAdjustContentInsets={true}
    //       width={this.state.screenWidth}
    //       height={this.state.screenWidth}
    //       nextButton={nextButton}
    //       prevButton={prevButton}
    //       buttonWrapperStyle={styles.buttonWrapperStyle}
    //     >
    //       {config.avatar.body.map((item, index) => {
    //         return (
    //             <Image
    //               style={{
    //                 width: this.state.screenWidth,
    //                 height: this.state.screenWidth,
    //                 resizeMode: 'contain'
    //               }}
    //               source={item.img}
    //             />
    //         )
    //       })}
    //     </Swiper>
    //   </View>
    // )
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
