import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from '../template'
import config from '../config'

class MainTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: props.hideHeader ? false : true
    }
  }

  // Component State Management
  componentDidMount() {
  }

  // Methods

  // Render
  render() {
    // Dynamic styles
    const compStyles = StyleSheet.create({})

    let content = (
      <KeyboardAwareScrollView>
        <ScrollView>
            <View style={styles.content}>
              {this.props.children}
            </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    )

    if(this.props.removeScrollView) {
      content = (
        <View style={styles.content}>
          {this.props.children}
        </View>
      )
    }

    if (this.props.onlyBackground) {
      content = this.props.children
    }

    const header = (
      <View style={styles.header}>
        <Header title={this.props.title} />
      </View>
    )

    // Component
    if (this.props.color == 2) {
      return (
        <LinearGradient colors={[config.colors.purple, config.colors.pink]} style={styles.background}>
          {this.state.header ? header : null}
          {content}
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={[config.colors.blue, config.colors.yellow]} style={styles.background}>
        {this.state.header ? header : null}
        {content}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 12,
  },
  content: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    shadowColor: config.colors.black,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.01,
    shadowRadius: 1,
    zIndex: 2,
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    alignSelf: 'stretch',
    height: 75,
  }
})

export default MainTemplate;
