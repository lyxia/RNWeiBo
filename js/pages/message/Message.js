import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    console.log('render Message');
    return (
      <View style={styles.root}>
        <Text>Message</Text>
      </View>
    )
  }
}

function makeStateToProps(state) {
  return {

  }
}

function makeDispatchToProps(dispatch) {
  return {

  }
}

module.exports = connect(makeStateToProps, makeDispatchToProps)(Message)
