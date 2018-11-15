import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { MainTemplate } from '../presentation'
import { Head, Body, Feet } from '../avatar'
import config from '../config'
import axios from 'axios'

class MyAvatar extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      headSelected: 0,
      bodySelected: 0,
      legSelected: 0,
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {
    this.setState({isLoading: false})
  }

  // Methods
  setHead = (index) => {
    this.setState({headSelected: index})
  }

  setBody = (index) => {
    this.setState({bodySelected: index})
  }

  setLeg = (index) => {
    this.setState({legSelected: index})
  }

  sendAvatar = () => {
    // put on loading
    this.setState({isLoading: true})

    // Format body of the request
    let data = new FormData()
    data.append('headId', (this.state.headSelected + 1))
    data.append('bodyId', (this.state.bodySelected + 1))
    data.append('legId', (this.state.legSelected + 1))

    // Make the request and wait for the avatar
    axios.post(config.api.path + '/app/avatars/generate', data)
      .then(response => {
        if (response.data.success) {
          this.props.navigation.navigate('myAvatarColor', {
            imageUri: response.data.src
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Render
  render() {
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
        <View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <Head setHead={this.setHead}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <Body setBody={this.setBody}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <Feet setLeg={this.setLeg}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <TouchableOpacity
                style={styles.btnPrimary}
                onPress={this.sendAvatar}
              >
              <Text style={styles.btnPrimaryText}>Create Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <MainTemplate title="My Avatar">
        {content}
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  btnPrimary: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: config.colors.primary,
  },

  btnPrimaryText: {
    color: config.colors.primary,
  },
})

export default withNavigation(MyAvatar);
