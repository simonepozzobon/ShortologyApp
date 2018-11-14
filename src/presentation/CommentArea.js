import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import axios from 'axios'
import config from '../config'

class CommentArea extends Component {
    constructor(props) {
      super(props)
      this.state = {
        replyTo: null,
        author_id: 14, // per debug impostato sul mio
        comment: '',
      }
    }

    model = () => {
      if (!this.state.replyTo) {
        return  'App\\Post'
      }
      return 'App\\Comment'
    }

    commentableId = () => {
      if (!this.state.replyTo) {
        return this.props.id
      }
      return this.state.replyTo
    }

    focus(id = null) {
      this.input.focus()
      this.state.replyTo = id ? id : null
    }

    setComment = (comment) => {
      this.setState({comment: comment})
    }

    sendComment = (key) => {
      let data = new FormData()
      data.append('comment', this.state.comment)
      data.append('author_id', this.state.author_id)
      data.append('model', this.model())
      data.append('id', this.commentableId())

      axios.post(config.api.path + '/app/comments/create', data)
        .then(response => {
          // clear comment area
          this.input.clear()
          
          // aggiorna i commenti nel componenst SinglePost
          this.props.updateComments(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    render() {
      return (
        <View
          style={{
            flex: 1,
            flexShrink: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            borderRadius: 14,
            padding: 10,
            marginHorizontal: 8,
            marginBottom: 20,
            backgroundColor: 'white',
          }}
        >
          <TextInput
            ref={ref => this.input = ref}
            placeholder="Write your comment.."
            style={{ minHeight: 44 }}
            multiline={true}
            maxLength={510}
            blurOnSubmit={true}
            returnKeyType="send"
            onChangeText={this.setComment}
            onSubmitEditing={this.sendComment}
          />
        </View>
      )
    }
}

export default CommentArea;
