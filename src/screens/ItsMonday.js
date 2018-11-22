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
import { setMonday } from '../redux/actions'

class ItsMonday extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }

    console.log(props)
  }

  // Component State Management
  componentDidMount() {
    if (this.props.posts.itsMonday.length == 0) {
      axios.get(config.api.path + '/app/monday').then(response => {
        this.props.setMonday(response.data)
        this.setState({isLoading: false})
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  // Render
  render() {
    // Component
    let content = (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 100+'%' }}>
        <PostsGrid posts={this.props.posts.itsMonday}/>
      </View>
    )

    if (this.state.isLoading) {
      content = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={config.colors.primary} />
        </View>
      )
    }

    return (
      <MainTemplate color={2} title="It's Friday">
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

export default connect(mapStateToProps, { setMonday })(ItsMonday);
