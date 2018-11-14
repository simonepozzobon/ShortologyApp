import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { TabNavigator } from 'react-navigation'

class SinglePostTabNavigator extends Component {
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
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>SinglePostTabNavigator Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({})

export default SinglePostTabNavigator;
