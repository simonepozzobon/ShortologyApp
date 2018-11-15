import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { ColorSelector } from '../presentation'

class ColorPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  setColor = (color) => {
    this.props.setColor(color)
  }

  keyExtractor = (data, index) => {
    return index.toString()
  }

  renderItem = (data, index) => {
    return (
      <ColorSelector
        color={data.item}
        setColor={this.setColor}
      />
    )
  }
  // Render
  render() {
    // Component
    return (
      <FlatList
        data={this.props.colors}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        numColumns={8}
        style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 4}}
      />
    );
  }
}

export default ColorPicker;
