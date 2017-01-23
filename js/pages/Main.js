import React from 'react'
import {
    Navigator,
    StyleSheet,
    View,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import {connect} from 'react-redux'
import {changeMainTab} from '../actions/RouteAction'
import HomeView from './home/Home'
import FindView from './find/Find'
import MineView from './mine/Mine'
import MessageView from './message/Message'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class MainTab extends React.Component {
  _renderItem(Component, tab, tabName, Icon, selectedIconName, iconName) {
    const {navigator} = this.props
    const _that = this
    return (
      <TabNavigator.Item
        selected={this.props.selectedTab == tab}
        title = {tabName}
        titleStyle = {{color: 'black'}}
        selectedTitleStyle = {{color: 'black'}}
        renderIcon = {()=><Icon name={iconName} size={25}/>}
        renderSelectedIcon = {()=><Icon name={selectedIconName} size={25}/>}
        onPress={() => this.props.changeTab(tab)}>
        <Component navigator={this.props.navigator}/>
      </TabNavigator.Item>
    )
  }

  render(){
    return (
      <TabNavigator>
        {this._renderItem(HomeView, 'home', '首页', Ionicons, 'ios-home', 'ios-home-outline')}
        {this._renderItem(MessageView, 'message', '消息', FontAwesome, 'envelope', 'envelope-o')}
        {this._renderItem(View, 'add', ' ', Ionicons, 'ios-add', 'ios-add-outline')}
        {this._renderItem(FindView, 'find', '发现', Ionicons, 'ios-search', 'ios-search-outline')}
        {this._renderItem(MineView, 'mine', '我', Ionicons, 'ios-person', 'ios-person-outline')}
      </TabNavigator>
    )
  }
}

function makeStateToProps(state) {
    return {
        selectedTab: state.Route.mainTab
    }
}

function makeDispatchToProps(dispatch) {
    return {
        changeTab: (tab)=>{
            dispatch(changeMainTab(tab))
        }
    }
}

const MainTabController = connect(makeStateToProps, makeDispatchToProps)(MainTab)

export default class Main extends React.Component {

    _initRoute = () => {
        const initRoute = {
            component: MainTabController
        }
        return initRoute
    }

    _renderScene = (route, navigator) => {
        return (
            <route.component navigator={navigator} {...route.args}/>
        )
    }

    render() {
        console.log('render main')
        return (
            <Navigator
                initialRoute = {this._initRoute()}
                renderScene = {this._renderScene}
            />
        )
    }
}