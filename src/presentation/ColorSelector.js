import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class ColorSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemWidth: Math.floor((Dimensions.get('window').width * .7) / 8)
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  setColor = () => {
    this.props.setColor(this.props.color)
  }

  // Render
  render() {
    // Component
    return (
      <TouchableOpacity
        onPress={this.setColor}
        style={{
          width: this.state.itemWidth,
          height: this.state.itemWidth,
          borderRadius: 20,
          backgroundColor: this.props.color,
          margin: 4,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({})

export default ColorSelector;
