import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { FavouritedSingle } from '../presentation'

class FavouritedGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemWidth: Dimensions.get('window').width * 0.3,
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  keyExtractor = (data, index) => {
    return data.id.toString()
  }

  renderItem = (data) => {
    return (
      <FavouritedSingle
        index={data.index}
        post={data.item}
        itemWidth={this.state.itemWidth}
      />
    )
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    return (
      <FlatList
        data={this.props.posts}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 10}}
      />
    );
  }
}

const styles = StyleSheet.create({})

export default FavouritedGrid;
