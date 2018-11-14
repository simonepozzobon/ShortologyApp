import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { CommentSingle } from '../presentation'
import config from '../config'

class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }

  // Component State Management
  componentDidMount() {
    this.setState({ comments: this.props.comments })
  }

  // Methods
  focusComment = (id) => {
    this.props.focusComment(id)
  }

  keyExtractor = (item, index) => {
    return index.toString()
  }

  renderComment = (data) => {
    return <CommentSingle comment={data.item} focusComment={ this.focusComment }/>
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    // Component
    return (
      <FlatList
        data={this.props.comments}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderComment}
        extraData={this.props.comments}
        style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 8 }}
      />
    )
  }
}

const styles = StyleSheet.create({})

export default CommentsList;
