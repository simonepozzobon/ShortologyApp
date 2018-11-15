import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import { HitParadeGrid } from '../container'
import config from '../config'

import axios from 'axios'

class HitParade extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      posts: [],
    }
  }

  // Component State Management
  componentDidMount() {
    return axios.get(config.api.path + '/app/hit-parade').then(response => {
      this.setState({
        isLoading: false,
        posts: response.data
      })
    })
  }

  // Methods
  method() {}

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    let content = (
      <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={config.colors.primary}
        />
      </View>
    )

    if (!this.state.isLoading) {
      content = (
        <HitParadeGrid
          posts={this.state.posts}
        />
      )
    }

    return (
      <MainTemplate
        color={2}
        title="Hit Parade"
      >
        {content}
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default HitParade;
