import React from 'react'
import {
  View,
  WebView
} from 'react-native'
import {connect} from 'react-redux'
import {getAuthURL, getCode} from '../server/API'
import {fetchToken} from '../actions/TokenAction'
import {AppStateCode} from '../reducers/AppState'

import Toast from 'react-native-root-toast'

class Login extends React.Component {
  constructor(props){
    super(props)

    this.times = this.props.times
  }

  onNavigationStateChange = (navState) => {
    var code = getCode(navState)
    //添加times是因为这个方法会进来多次，导致code失效
    if (code != 0 && this.times == 1) {
      this.props.getAccessToken(code)
      this.times++
    }
  }

  componentDidUpdate(){
    if (this.props.isLogining) {
      Toast.show('正在授权...',{
        position:Toast.positions.CENTER
      })
    }
    if (this.props.LoginFailed) {
      Toast.show('授权失败',{
        duration: Toast.durations.SHORT,
        position:Toast.positions.CENTER
      })
    }
    if (this.props.isLogin) {
      Toast.show('授权成功',{
        duration: Toast.durations.SHORT,
        position:Toast.positions.CENTER
      })
    }
  }

  render() {
    console.log('render login');
    return (
      <WebView
        ref={(ref)=>{this.webView = ref}}
        source = {{uri:getAuthURL()}}
        startInLoadingState={true}
        onNavigationStateChange = {this.onNavigationStateChange}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    //每次重新渲染的时候times为1
    times: 1,
    isLogining: state.AppState == AppStateCode.LOGINING,
    LoginFailed: state.AppState == AppStateCode.LOGIN_FAILURE,
    isLogin: state.AppState == AppStateCode.LOGIN
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getAccessToken:(code) => dispatch(fetchToken(code))
  }
}

const LoginController = connect(mapStateToProps, mapDispatchToProps)(Login)
module.exports = LoginController
