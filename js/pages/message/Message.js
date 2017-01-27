import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'

import Header from '../../commons/Header'
import {fetchFriendsList} from '../../actions/FriendShipsAction'
import {fetchUnReadMessage, setEmptyUnReadForCategory} from '../../actions/UnReadAction'
import Icon from 'react-native-vector-icons/Ionicons';
import {formatDateToCur} from '../../utils/utils'
import WBColor from '../../commons/WBColor'
import Badge from 'react-native-tab-navigator/Badge';
import Talk from './Talk'

const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  friendItem:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 8,
  },
  friendItemHeaderImage:{
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  friendItemContentAndTime: {
    flexDirection: 'row',
    paddingVertical:15,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor: WBColor.lineColor,
    flex:1,
    marginLeft:8,
    paddingRight: 8,
    justifyContent:'space-between'
  },
  friendItemContent:{
    flexShrink:1,
  },
  friendItemContentTitle:{
    marginBottom:8
  },
  friendItemTime:{

  },
  unReadItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  unReadItemHeader:{
    paddingHorizontal:8,
    width: 63,
  },
  unReadContentAndBarge: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor: WBColor.lineColor,
  },
  unReadItemContent:{
    flexShrink:1,
  },
  unReadItemBadge:{
    backgroundColor:'red'
  }
})

class FriendItem extends React.Component {
  render() {
    const date = new Date(this.props.data.created_at)
    let format = formatDateToCur(date)

    return (
      <TouchableOpacity onPress={()=>this.props.onPress(this.props.data)}>
        <View style={styles.friendItem}>
            <Image source={{uri:this.props.data.profile_image_url}} style={styles.friendItemHeaderImage}/>
            <View style={styles.friendItemContentAndTime}>
              <View style={styles.friendItemContent}>
                <Text style={styles.friendItemContentTitle}>{this.props.data.screen_name}</Text>
                <Text numberOfLines={1}>{this.props.data.description}</Text>
              </View>
              <View style={styles.friendItemTime}>
                <Text>{format}</Text>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class UnReadItem extends React.Component {

  _onPress = ()=>{
    this.props.onPress(this.props.content)
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.unReadItem}>
            <View style={styles.unReadItemHeader}>
              <Icon name='ios-at' size={48}/>
            </View>
            <View style={styles.unReadContentAndBarge}>
              <View style={styles.unReadItemContent}>
                <Text>{this.props.content}</Text>
              </View>
              <Badge style={styles.unReadItemBadge}>{this.props.unReadCount}</Badge>
            </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props)

    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    this.isRefresh = false
  }

  componentDidMount() {
    if(this.props.friends.length == 0) {
      this.props.fetchFriendsList()
    }
  }

  _renderRow = (rowData)=>{
    if(rowData.category && rowData.category=='unRead') {
      return <UnReadItem {...rowData} onPress={(category)=>this.props.setEmptyUnReadForCategory(category)}/>
    }
    return <FriendItem data={rowData} onPress={(userInfo)=>this.props.navigator.push({component:Talk, args:{userInfo}})}/>
  }

  _renderRefreshControl = ()=>{
      return (
      <RefreshControl
          refreshing = {this.props.isRefresh}
          onRefresh = {()=>this.props.fetchUnReadMessage()}
      />
      )
  }

  render(){
    this.dataSource = this.dataSource.cloneWithRows(this.props.datas)
    return (
      <View style={styles.root}>
        <Header
          title = {Header.DefaultTitle('消息')}
        />
        <ListView
          dataSource = {this.dataSource}
          renderRow = {this._renderRow}
          enableEmptySections = {true}
          //下拉
          refreshControl = {this._renderRefreshControl()}
        />
      </View>
    )
  }
}

function makeStateToProps(state) {
  const unReadItems = Object.keys(state.UnRead.data)
  .filter((key)=>{
    return state.UnRead.data[key] !== 0 && key !== 'status'
  })
  .map((key)=>{
    return {
      category:'unRead',
      content:key,
      unReadCount:state.UnRead.data[key]
    }
  })
  const friends = state.Friend
  return {
    datas: [].concat(unReadItems).concat(friends),
    friends: friends,
    isRefresh: state.UnRead.isRefresh
  }
}

function makeDispatchToProps(dispatch) {
  return {
    fetchFriendsList: ()=>dispatch(fetchFriendsList()),
    setEmptyUnReadForCategory: (category)=>dispatch(setEmptyUnReadForCategory(category)),
    fetchUnReadMessage:()=>dispatch(fetchUnReadMessage())
  }
}

module.exports = connect(makeStateToProps, makeDispatchToProps)(Message)
