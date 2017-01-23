import React from 'react'
import {AppRegistry} from 'react-native'
import App from './App'

if(!__DEV__) {
  console = {
    log:()=>{},
    error:()=>{},
    info:()=>{}
  }
}

AppRegistry.registerComponent("WeiBo",()=>App)
