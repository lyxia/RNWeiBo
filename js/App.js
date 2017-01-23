//拉进全局变量
require('./utils/global');

import {connect, Provider} from 'react-redux'
import React from 'react'

import LoginView from './pages/Login'
import MainView from './pages/Main'
import LoadingView from './pages/Loading'
import {configureStore} from './stores/configureStore'
import {AppStateCode} from './reducers/AppState'


class Root extends React.Component {
    render() {
        console.log('root view')
        if(this.props.isLoading) {
            //显示加载页面
            return <LoadingView/>;
        }
        if(this.props.isLogin) {
            //显示主页面
            return <MainView/>
        } else {
            //显示登陆页面
            return <LoginView/>
        }
    }
}

function makeStateToProps(state) {
    console.log('root view controller')
    return {
        isLogin: state.AppState == AppStateCode.LOGIN,
        isLoading: state.AppState == AppStateCode.LOADING
    }
}

RootViewController = connect(makeStateToProps)(Root)

const store = configureStore()

export default class App extends React.Component {
    constructor(props){
        super()
    }

    render() {
        return (
            <Provider store={store}>
                <RootViewController/>
            </Provider>
        )
    }
}
