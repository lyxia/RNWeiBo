import React from 'react'
import {
    Navigator,
    StyleSheet,
    View,
    Modal,
    Text,
    Button,
    Animated
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import {connect} from 'react-redux'
import {changeMainTab} from '../actions/RouteAction'
import HomeView from './home/Home'
import FindView from './find/Find'
import MineView from './mine/Mine'
import MessageView from './message/Message'
import AddView from './Add'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {fetchUnReadMessage} from '../actions/UnReadAction'

class MainTab extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            addVisible: false,
            alphaValue: new Animated.Value(0)
        }
    }

    componentWillMount() {
        var navigator = this.props.navigator;
        var callback = (event) => {
            if(event.target._currentRoute.component.displayName === 'Connect(MainTab)') {
                this._setAddVisible(false)
            }
        };
        this._listeners = [
            this.props.navigator.navigationContext.addListener('willfocus', callback),
        ]
    }

    componentWillUnMount() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }

  _renderItem(Component, tab, tabName, Icon, selectedIconName, iconName, badgeText=0) {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTab == tab}
        title = {tabName}
        badgeText = {badgeText}
        badgeStyle = {{backgroundColor:'red', borderColor:'red'}}
        titleStyle = {{color: 'black'}}
        selectedTitleStyle = {{color: 'black'}}
        renderIcon = {()=><Icon name={iconName} size={25}/>}
        renderSelectedIcon = {()=><Icon name={selectedIconName} size={25}/>}
        onPress={()=>this._changeTab(tab)}>
        <Component navigator={this.props.navigator}/>
      </TabNavigator.Item>
    )
  }

  _changeTab = (tab)=>{
      if(tab === 'add') {
          this._setAddVisible(true)
      } else {
        this.props.changeTab(tab)
      }
  }

  _renderAddItem = (tab)=>{
      return (
        <TabNavigator.Item
            renderIcon = {()=><Ionicons name='ios-add' color='white' size={40} fontWeight={100}/>}
            renderSelectedIcon = {()=><Ionicons name='ios-add' color='white' size={40} fontWeight={100}/>}
            tabStyle = {{paddingBottom:0, backgroundColor:'#ffa200', justifyContent:'center', borderRadius:10}}
            onPress={()=>this._changeTab(tab)}
        />
        )
  }

  _setAddVisible = (visible) => {
      this.setState({...this.state, addVisible:visible})
  }

  render(){
    return (
        <View style={styles.root}>
            <TabNavigator>
                {this._renderItem(HomeView, 'home', '首页', Ionicons, 'ios-home', 'ios-home-outline', this.props.unRead.status)}
                {this._renderItem(MessageView, 'message', '消息', FontAwesome, 'envelope', 'envelope-o', this.props.unRead.totalMessage)}
                {this._renderAddItem('add')}
                {this._renderItem(FindView, 'find', '发现', Ionicons, 'ios-search', 'ios-search-outline')}
                {this._renderItem(MineView, 'mine', '我', Ionicons, 'ios-person', 'ios-person-outline')}
            </TabNavigator>
            {this.state.addVisible ?
                (
                    <AddView style={styles.blurContainer} onClose={()=>this._setAddVisible(false)} navigator={this.props.navigator}/>
                ) : null
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'white',
    },
    blurContainer: {
        position: 'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
    },
})

function makeStateToProps(state) {
    const totalMessage = Object.keys(state.UnRead.data).reduce((total,cur)=>{
        total += state.UnRead.data[cur]
        return total
    },0-state.UnRead.data.status)
    return {
        selectedTab: state.Route.mainTab,
        unRead:{
            status: state.UnRead.data.status,
            totalMessage: totalMessage
        }
    }
}

function makeDispatchToProps(dispatch) {
    return {
        changeTab: (tab)=>{
            dispatch(changeMainTab(tab))
        },
        fetchUnReadMessage: ()=>dispatch(fetchUnReadMessage())
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

    _configureScene = (route, routeStack) =>{
        if(route.SceneConfigs)  {
            return route.SceneConfigs
        }
        if(route.enableGestures) {
            this.navigator.enableGestures = route.enableGestures
        } else {
            this.navigator && (this.navigator.enableGestures = true)
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    render() {
        console.log('render main')
        return (
            <Navigator
                ref = {(ref)=>this.navigator = ref}
                initialRoute = {this._initRoute()}
                renderScene = {this._renderScene}
                configureScene = {this._configureScene}
            />
        )
    }
}