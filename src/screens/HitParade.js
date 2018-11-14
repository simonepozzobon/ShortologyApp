import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MainTemplate } from '../presentation'

class HitParade extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // Component State Management
  componentDidMount() {
    this.setState()
  }

  // Methods
  method() {}

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    return (
      <MainTemplate
        color={2}
        title="Hit Parade"
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Hit Parade</Text>
        </View>
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({})

export default HitParade;
