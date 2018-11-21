import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  CommentArea,
  MainTemplate,
  PostContent,
  PostInteractionNav
} from '../presentation'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'
import { CommentsList } from '../container'
import config from '../config'

class PostContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: props.post.comments,
      likeCount: props.post.likes ? props.post.likes.count : 0,
      commentCount: props.post.comments ? props.post.comments.length : 0,
      screenWidth: Dimensions.get('window').width,
    }
  }

  // Component State Management

  // Methods
  focusComment = (id = null) => {
    if (id) {
      this.CommentArea.focus(id)
    } else {
      this.CommentArea.focus()
    }
  }

  deleteComment = (id) => {
    this.setState({
      commentCount: this.state.commentCount - 1,
      comments: this.state.comments.filter(comment => comment.id != id)
    })
  }

  updateComments = (newComment) => {
    this.setState({
      commentCount: this.state.commentCount + 1,
      comments: [...this.state.comments, newComment]
    })
  }

  stopVideo = () => {
    if (this.postMediaContent) {
      this.postMediaContent.stopVideo()
    }
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    let commentList = (
      <CommentsList
        comments={this.state.comments}
        focusComment={this.focusComment}
        deleteComment={this.deleteComment}
        user={this.props.user}
      />
    )

    // Component
    return (
      <KeyboardAwareScrollView
        extraHeight={148}
      >
        <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 148}}>
          <PostContent
            post={this.props.post}
            ref={ref => this.postMediaContent = ref }
          />
          <PostInteractionNav
            id={this.props.post.id}
            title={this.props.post.title}
            slug={this.props.post.slug.slug}
            likeCount={this.state.likeCount}
            commentCount={this.state.commentCount}
            focusComment={this.focusComment}
            user={this.props.user}
          />
          {this.state.comments.length > 0 ? commentList : null}
          <CommentArea
            id={this.props.post.id}
            updateComments={this.updateComments}
            user={this.props.user}
            ref={x => this.CommentArea = x}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({})

export default PostContainer;
