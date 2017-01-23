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

class Mine extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    console.log('render Mine');
    return (
      <View style={styles.root}>
        <Text>mine</Text>
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

module.exports = connect(makeStateToProps, makeDispatchToProps)(Mine)
