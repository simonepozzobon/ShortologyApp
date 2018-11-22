import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

// Components
import { MainTemplate } from '../presentation'
import { PostsGrid } from '../container'
import config from '../config'

// Libraries
import axios from 'axios'
import { connect } from 'react-redux'
import { setFriday } from '../redux/actions'

class ItsFriday extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  // Component State Management
  componentDidMount() {
    if (this.props.posts.itsFriday.length == 0) {
      axios.get(config.api.path + '/app/friday').then(response => {
        this.props.setFriday(response.data)
        this.setState({isLoading: false})
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  // Methods

  // Render
  render() {
    // Component
    let content = (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 100+'%' }}>
        <PostsGrid
          posts={this.props.posts.itsFriday}
        />
      </View>
    )

    if (this.state.isLoading) {
      content = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        title="It's Friday"
      >
        {content}
      </MainTemplate>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { setFriday })(ItsFriday);
