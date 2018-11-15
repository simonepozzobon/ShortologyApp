import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { MainTemplate } from '../presentation'
import { ColorPicker } from '../container'
import config from '../config'
import axios from 'axios'

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
      isLoading: true,
      imageId: props.navigation.state.params.imageId,
      imageUri: props.navigation.state.params.imageUri,
      itemWidth: Dimensions.get('window').width * 0.5,
      color: '#f1f1e7',
    }
  }

  // Component State Management
  componentWillMount() {}
  componentDidMount() {}

  // Methods
  setColor = (color) => {
    this.setState({color: color})
  }

  saveAvatar = () => {
    let data = new FormData()
    data.append('id', this.state.imageId)
    data.append('color', this.state.color)

    axios.post(config.api.path + '/app/avatars/add-background', data)
      .then(response => {
        console.log(response)
        this.props.navigation.navigate('profile')
      })
      .catch(err => {
        console.log(err)
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

    // Component
    return (
      <MainTemplate title="My Avatar">
        {imagePreview}
        <View
          style={{flex: 1, marginBottom: 40}}
        >
          <ColorPicker
            colors={colorsList}
            setColor={this.setColor}
          />
        </View>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={this.saveAvatar}
        >
          <Text style={styles.btnPrimaryText}>Save</Text>
        </TouchableOpacity>
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

export default MyAvatarColor;