import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import { Head, Body, Feet } from '../avatar'
import config from '../config'

class MyAvatar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    return (
      <MainTemplate title="My Avatar">
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
          <Head />
        </View>
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
          <Body />
        </View>
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
          <Feet />
        </View>
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => {this.goTo('')}}>
            <Text style={styles.btnPrimaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
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

export default MyAvatar;
