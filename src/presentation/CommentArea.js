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
        author_id: props.user.author.id, // per debug impostato sul mio
        comment: '',
      }

      this.sendComment = this.sendComment.bind(this)
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
      console.log('modifica', comment)
      this.setState({comment: comment})
    }

    sendComment = () => {
      let data = new FormData()
      data.append('comment', this.state.comment)
      data.append('author_id', this.state.author_id)
      data.append('model', this.model())
      data.append('id', this.commentableId())

      const url = config.api.path + '/app/comments/create'
      console.log(url)

      axios.post(url, data).then(response => {
        console.log(response)
        // clear comment area
        this.input.clear()

        // aggiorna i commenti nel componenst SinglePost
        this.props.updateComments(response.data)
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
            onChangeText={comment => {this.setComment(comment)}}
            onSubmitEditing={this.sendComment}
          />
        </View>
      )
    }
}

export default CommentArea;
