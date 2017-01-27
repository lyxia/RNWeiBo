import React from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    View,
    ActivityIndicator
} from 'react-native'
import {observer} from 'mobx-react/native'
import WBColor from '../commons/WBColor'

const styles = StyleSheet.create({
    root:{
        backgroundColor:WBColor.backgroundColor
    }
})

@observer
export default class ItemList extends React.Component {

    componentDidMount() {
        this.props.listRequest.refreshPage()
    }

    _renderRow = (rowData, sectionID, rowID)=>{
        return <this.props.item.component style={this.props.item.style} data={rowData} args={this.props.item.args}/>
    }

    _renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing = {this.props.listRequest.isRefresh}
                onRefresh = {this.props.listRequest.refreshPage}
            />
            )
    }

    _renderFooter = () => {
        if(this.props.listRequest.isOver) {
            return <View/>
        }
        return <ActivityIndicator/>
    }

    _onEndReached = () => {
        if(!this.props.listRequest.isOver) {
            this.props.listRequest.loadNextPage()
        }
    }

    render () {
        return (
            <ListView
                style = {[styles.root, this.props.style]}
                dataSource = {this.props.listRequest.dataSource}
                renderRow = {(rowData, sectionID, rowID)=>this._renderRow(rowData, sectionID, rowID)}
                enableEmptySections = {true}
                //下拉
                refreshControl = {this._renderRefreshControl()}
                //上拉
                renderFooter = {()=>this._renderFooter()}
                //页面滚动底部时，自动触发
                onEndReached = {()=>this._onEndReached()}
            />
        )
    }
}