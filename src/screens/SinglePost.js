import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
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
      user: {},
      postContainer: []
    }

    this.beforeSnapToItem = this.beforeSnapToItem.bind(this)
  }

  // Component State Management
  componentWillMount() {}

  componentDidMount() {
    return fetch(config.api.path + '/app/single-post/' + this.props.navigation.state.params.slug)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
        this.setState({
          posts: responseJson.posts,
          firstItem: responseJson.idx
        })

        AsyncStorage.getItem('user').then(user => {
          this.setState({
            isLoading: false,
            user: JSON.parse(user)
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentWillUnmount() {
    console.log('ditruggiiii')
  }

  // Methods
  beforeSnapToItem = (index) => {
    for (var i = 0; i < this.state.postContainer.length; i++) {
      if (this.state.postContainer[i]) {
        this.state.postContainer[i].stopVideo()
      }
    }
  }

  renderItem = (data) => {
    return (
      <PostContainer
        post={data.item}
        pauseVideo={this.pauseVideo}
        ref={ref => this.state.postContainer[data.index] = ref}
      />
    )
  }

  // Render
  render() {
    // Caricamento
    let content = (
      <Carousel
        ref={ref => this.Carousel = ref}
        data={this.state.posts}
        firstItem={this.state.firstItem}
        renderItem={this.renderItem}
        sliderWidth={this.state.screenWidth}
        itemWidth={this.state.screenWidth}
        removeClippedSubviews={true}
        onBeforeSnapToItem={this.beforeSnapToItem}
      />
    )

    if (this.state.isLoading) {
      content = (
          <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={config.colors.primary}
            />
          </View>
      )
    }

    return (
      <MainTemplate
        color={2}
        title="It's Monday"
        removeScrollView={true}
      >
        {content}
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default withNavigation(SinglePost);
