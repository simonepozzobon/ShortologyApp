import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  MainTemplate
} from '../presentation'

import {
  PostContainer
} from '../Post'

import Carousel from 'react-native-snap-carousel'
import { withNavigation } from 'react-navigation'
import { CommentsList } from '../container'
import config from '../config'

class SinglePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      posts: [],
      firstItem: 0,
      screenWidth: Dimensions.get('window').width,
    }
  }

  // Component State Management
  componentWillMount() {}

  componentDidMount() {
    return fetch(config.api.path + '/app/single-post/' + this.props.navigation.state.params.slug)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
        this.setState({
          isLoading: false,
          posts: responseJson.posts,
          firstItem: responseJson.idx
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Methods

  renderItem = (data, index) => {
    return (
      <PostContainer
        post={data.item}
      />
    )
  }

  // Render
  render() {
    // Dynamic styles

    // Caricamento
    if (this.state.isLoading) {
      return (
        <MainTemplate
          color={2}
          title="It's Monday"
        >
          <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={config.colors.primary}
            />
          </View>
          <View style={{flex: 2}}></View>
        </MainTemplate>
      )
    }

    return (
      <MainTemplate
        color={2}
        title="It's Monday"
        removeScrollView={true}
      >
        <Carousel
          ref={ref => this.Carousel = ref}
          data={this.state.posts}
          firstItem={this.state.firstItem}
          renderItem={this.renderItem}
          sliderWidth={this.state.screenWidth}
          itemWidth={this.state.screenWidth}
          removeClippedSubviews={true}
        />
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default withNavigation(SinglePost);
