import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'

class ConfirmEmail extends Component {
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
      <MainTemplate
        hideHeader={true}
        onlyBackground={true}
      >
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Success!</Text>
          <Text>Please, check your email</Text>
          <Text>to complete your registration</Text>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default ConfirmEmail;
