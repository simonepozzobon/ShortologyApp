import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MainTemplate } from '../presentation'
import { PostsGrid } from '../container'
import config from '../config'

class ItsFriday extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      posts: []
    }
  }

  // Component State Management
  componentDidMount() {
    return fetch(config.api.path + '/app/friday')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          posts: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Methods

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    if (this.state.isLoading) {
      return (
        <MainTemplate
          color={2}
          title="It's Friday"
        >
          <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={config.colors.primary}
            />
          </View>
          <View style={{flex: 2}}></View>
        </MainTemplate>
      );
    }

    return (
      <MainTemplate
        color={2}
        title="It's Friday"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 100+'%' }}>
          <PostsGrid
            posts={this.state.posts}
          />
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default ItsFriday;
