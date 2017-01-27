import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Header from '../../commons/Header'
import ItemListView from '../../components/ItemList'
import HomeItem from '../../components/Item'
import {home_timeline} from '../../server/API'
import PageListRequest from '../../server/PageListRequest'
import WBColor from '../../commons/WBColor'
import CommentView from './Comment'
import {connect} from 'react-redux'
import {setEmptyUnReadForCategory} from '../../actions/UnReadAction'
import {autorun} from 'mobx'

const styles = StyleSheet.create({
  root:{
    flex:1
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.listRequest = new PageListRequest(home_timeline)

    autorun(()=>{
      if(this.listRequest.isRefresh){
        this.props.setEmptyUnReadForStatus()
      }
    })
  }

  _showItemDetail = (data)=>{
    this.props.navigator.push({
      component:CommentView,
      args:{
        data
      }
    })
  }

  _renderListItem = () => {
    return {
      component: HomeItem,
      args:{
        showRetweentItemDetail: this._showItemDetail,
        showItemDetail:this._showItemDetail,
        maxTextLine: 5,
      },
    }
  }

  render(){
    return (
      <View style={styles.root}>
        <Header
          title = {Header.DefaultTitle(this.props.userName)}
        />
        <ItemListView item={this._renderListItem()} listRequest={this.listRequest}/>
      </View>
    )
  }
}

function makeStateToProps(state) {
  return {
    userName: state.Login.userInfo.userInfo.screen_name
  }
}

function makeDispatchToProps(dispatch) {
  return {
    setEmptyUnReadForStatus:()=>dispatch(setEmptyUnReadForCategory('status'))
  }
}

module.exports = connect(makeStateToProps, makeDispatchToProps)(Home)