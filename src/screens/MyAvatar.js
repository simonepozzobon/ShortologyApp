import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
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
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      headSelected: 0,
      bodySelected: 0,
      legSelected: 0,
    }
  }

  // Component State Management
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
            imageId: response.data.id,
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
    const height = Dimensions.get('window').height - 100
    const width = Dimensions.get('window').width

    let headRatio = .3
    let bodyRatio = .5
    let legRatio = .45

    const btnSize = 44 + 20 // from styles
    const elsPadding = 20 //60 // from element styles

    let headSize = Math.round(width * headRatio)
    let bodySize = Math.round(width * bodyRatio)
    let legSize = Math.round(width * legRatio)

    let totalSize = headSize + bodySize + legSize + btnSize + elsPadding

    while (totalSize >= height) {
      headRatio = headRatio - 0.01
      bodyRatio = bodyRatio - 0.01
      legRatio = legRatio - 0.01

      headSize = Math.round(width * headRatio)
      bodySize = Math.round(width * bodyRatio)
      legSize = Math.round(width * legRatio)

      totalSize = headSize + bodySize + legSize + btnSize + elsPadding
    }

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
            <Head setHead={this.setHead} size={headSize}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <Body setBody={this.setBody} size={bodySize}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
            <Feet setLeg={this.setLeg} size={legSize}/>
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
