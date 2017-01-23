import React from 'react'
import {
  TouchableHighlight,
  Text
} from 'react-native'

module.exports = {
  LeftButton: (route, navigator, index, navState) => {
    if (index == 0) {
      return null
    } else {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text>返回</Text>
        </TouchableHighlight>
      )
    }
  },
  RightButton: (route, navigator, index, navState) => {
    if (!route.rightButton) {
      return null
    }
    return route.rightButton
  },
  Title: (route, navigator, index, navState) => {
    if (!route.title) {
      return null
    }
    return (
      <Text>{route.title}</Text>
    )
  }
}
