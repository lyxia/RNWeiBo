import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Header from '../../commons/Header'

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'white'
  }
})

class Talk extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <View style={styles.root}>
        <Header
            left = {Header.DefaultLeft(()=>this.props.navigator.pop())}
            title = {Header.DefaultTitle(this.props.userInfo.screen_name)}
        />
        <Text>Talk</Text>
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

module.exports = connect(makeStateToProps, makeDispatchToProps)(Talk)
