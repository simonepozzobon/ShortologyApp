import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import { FavouritedGrid } from '../container'
import { withNavigation } from 'react-navigation'
import config from '../config'
import axios from 'axios'

class UserFavourited extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      posts: [],
      isLoading: true,
    }
  }

  // Component State Management
  componentWillMount() {
    AsyncStorage.getItem('user').then(userJson => {
      const user = JSON.parse(userJson)
      console.log('utente', user)
      const author_id = user.author.id

      this.setState({user: user})

      axios.get(config.api.path + '/app/user/' + author_id + '/hit-parade')
        .then(response => {
          this.setState({
            isLoading: false,
            posts: response.data
          })
        })
    })
  }

  // Methods

  // Render
  render() {

    // Component
    let content = (
      <ActivityIndicator
        size="large"
        color={config.colors.primary}
      />
    )

    if (!this.state.isLoading) {
      content = (
        <FavouritedGrid
          posts={this.state.posts}
        />
      )
    }

    return (
      <MainTemplate title="Favourited">
        {content}
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default withNavigation(UserFavourited);
