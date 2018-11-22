import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// Components
import { MainTemplate } from '../presentation'
import { ColorPicker } from '../container'
import config from '../config'

// Libraries
import axios from 'axios'
import { connect } from 'react-redux'

// Redux
import { setAvatar } from '../redux/actions'


const colorsList = [
 '#f1f1e7',
 '#cebcdd',
 '#bcc8d0',
 '#ecdd93',
 '#f9d3da',
 '#e2d3b1',
 '#a7d3da',
 '#dfd0b7',
 '#d5d3c6',
 '#d8dfe2',
 '#4a5c6b',
 '#f6b170',
 '#c6d886',
 '#afd8d0',
 '#f6b498',
 '#d3ecfb'
]

class MyAvatarColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      imageId: props.navigation.state.params.imageId,
      imageUri: props.navigation.state.params.imageUri,
      itemWidth: Dimensions.get('window').width * 0.5,
      color: '#f1f1e7',
      author_id: 0,
    }
  }

  // Component State Management
  componentDidMount() {}

  // Methods
  setColor = (color) => {
    this.setState({color: color})
  }

  saveAvatar = () => {
    this.setState({isLoading: true})
    let data = new FormData()
    data.append('id', this.state.imageId)
    data.append('color', this.state.color)
    data.append('author_id', this.props.user.user.author.id)
    // console.log(this.state.imageId, this.state.color, this.props.user.user.author.id)

    axios.post(config.api.path + '/app/avatars/add-background', data).then(response => {
      this.props.setAvatar(response.data.user.avatar)
      this.props.navigation.navigate('profile')
    })
  }

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    const imagePreview = (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.state.color,
        borderRadius: this.state.itemWidth,
        padding: 40,
        marginTop: 20,
        marginBottom: 40,
       }}>
        <Image
          style={{
            width: this.state.itemWidth,
            height: this.state.itemWidth,
            resizeMode: 'contain'
          }}
          source={{ uri: this.state.imageUri }}
        />
      </View>
    )

    let content = (
      <View
        style={{flex: 1, marginBottom: 40}}
      >
        <ColorPicker
          colors={colorsList}
          setColor={this.setColor}
        />
      </View>
    )

    let btn = (
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={this.saveAvatar}
      >
        <Text style={styles.btnPrimaryText}>Save</Text>
      </TouchableOpacity>
    )

    if (this.state.isLoading) {
      content = (
        <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color={config.colors.primary}
          />
        </View>
      )

      btn = null
    }

    // Component
    return (
      <MainTemplate title="My Avatar">
        {imagePreview}
        {content}
        {btn}
      </MainTemplate>
    );
  }
}

const styles = StyleSheet.create({
  btnPrimary: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: config.colors.primary,
  },

  btnPrimaryText: {
    color: config.colors.primary,
  },
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setAvatar })(MyAvatarColor);
