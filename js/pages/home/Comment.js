import React from 'react'
import {
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native'

import {observer} from 'mobx-react/native'
import PageListRequest from '../../server/PageListRequest'
import {comment_show} from '../../server/API'
import Item from '../../components/Item'
import ReplayItem from '../../components/ReplayItem'
import SegementControl from '../../commons/Segement'
import WBColor from '../../commons/WBColor'
import Header from '../../commons/Header'

const styles = StyleSheet.create({
    root:{
        backgroundColor:WBColor.backgroundColor,
    },
    sectionHeader:{
        height:47,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'stretch',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:WBColor.lineColor,
        backgroundColor:'white',
    },
    sectionHeaderRight:{
        justifyContent:'center',
        alignItems:'center',
        paddingRight:20,
    },
    sectionHeaderText: {
        color: WBColor.iconColor
    }
})

@observer
export default class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.listRequest = new PageListRequest(comment_show, {id:this.props.data.id})
        this.dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
            sectionHeaderHasChanged:(r1,r2)=>r1!==r2
        })

        this.state = {
            selectedIndex:1
        }
    }

    componentDidMount() {
        console.log('comment did mount')
        this.listRequest.refreshPage()
    }

    _showItemDetail = (data)=>{
        console.log(`_showItemDetail = ${data}`)
        this.props.navigator.push({
        component:Comment,
        args:{
            data
        }
        })
    }

    _renderHeader = (sectionData, sectionID)=>{
        return (
            <Item 
                data={this.props.data} 
                args={{
                    showRetweentItemDetail: this._showItemDetail
                }}
            />
        )
    }

    _renderSectionHeader = (sectionData, sectionID)=>{
        return (
            <View style={styles.sectionHeader}>
                <SegementControl
                    values = {[`转发 ${this.props.data.reposts_count}`,`评论 ${this.props.data.comments_count}`]}
                    selectedIndex = {this.state.selectedIndex}
                    onChange = {(newIndex)=>this._segmentChange(newIndex)}
                />
                <View style={styles.sectionHeaderRight}>
                    <Text style={styles.sectionHeaderText}>赞 {this.props.data.attitudes_count}</Text>
                </View>
            </View>
        )
    }

    _segmentChange = (newIndex)=>{
        this.setState({...this.state,selectedIndex:newIndex})
    }

    _renderRow = (rowData, sectionID, rowID)=>{
        console.log(`render row = ${rowData}`)
        return (
            <ReplayItem data={rowData}/>
        )
    }

    _renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing = {this.listRequest.isRefresh}
                onRefresh = {this.listRequest.refreshPage}
            />
        )
    }

    _renderFooter = () => {
        if(this.listRequest.isOver) {
            return <View/>
        }
        return <ActivityIndicator/>
    }

    _onEndReached = () => {
        if(!this.listRequest.isOver) {
            this.listRequest.loadNextPage()
        }
    }

    render() {
        console.log('render comment')
        const sectionData = {
            'comments':this.listRequest.data.slice()
        }
        this.dataSource = this.dataSource.cloneWithRowsAndSections(sectionData)

        return (
            <View>
                <Header
                    left = {Header.DefaultLeft(()=>this.props.navigator.pop())}
                    title = {Header.DefaultTitle("微博正文")}
                />
                <ListView
                    style={styles.root}
                    renderHeader = {this._renderHeader}
                    renderSectionHeader = {this._renderSectionHeader}
                    renderRow = {this._renderRow}
                    dataSource = {this.dataSource}
                    enableEmptySections = {true}
                    //上拉
                    refreshControl = {this._renderRefreshControl()}
                    //下拉
                    renderFooter = {()=>this._renderFooter()}
                    //页面滚动底部时，自动触发
                    onEndReached = {()=>this._onEndReached()}
                />
            </View>
        )
    }
}