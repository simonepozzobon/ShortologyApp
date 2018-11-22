import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

// Components
import { MainTemplate } from '../presentation'
import { HitParadeGrid } from '../container'
import config from '../config'

// Libraries
import axios from 'axios'
import { connect } from 'react-redux'
import { setHitParade } from '../redux/actions'

class HitParade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  // Component State Management
  componentDidMount() {
    if (this.props.posts.hitParade.length == 0) {
      axios.get(config.api.path + '/app/hit-parade').then(response => {
        this.props.setHitParade(response.data)
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
      <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={config.colors.primary}/>
      </View>
    )

    if (!this.state.isLoading) {
      content = <HitParadeGrid posts={this.props.posts.hitParade}/>
    }

    return (
      <MainTemplate color={2} title="Hit Parade">
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

export default connect(mapStateToProps, { setHitParade })(HitParade);
