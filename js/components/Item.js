import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import WBColor from '../commons/WBColor'

import RetweentedItem from './RetweentedItem'
import LinkText from './LinkText'
import LinkMedia from './LinkMedia'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react/native'
import {action} from 'mobx'

class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.headerUserInfo}>
                    <Image style={styles.headerUserInfoProfile} source={{uri:this.props.data.profile_image_url}}/>
                    <View style={styles.headerUserNameAndOtherInfo}>
                        <View>
                            <Text style={styles.headerUserName}>{this.props.data.screen_name}</Text>
                        </View>
                        <View>
                            <Text style={[styles.headerUserSource, styles.iconColor]}>{this.props.data.location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.headerAttention}>
                    <Icon name='angle-down' size={20} style={styles.iconColor}/>
                </View>
            </View>
        )
    }
}

@observer
class Footer extends React.Component {

    _forwardHandler = ()=>{
        console.log('forwardHandler')
    }

    _renderBotton = (icon,onPress,text, num, colorStyle) => {
        if (num > 0) {
            text = `${text}(${num})`
        }
        return (
            <TouchableHighlight onPress={onPress} style={styles.footerLink} underlayColor={WBColor.backgroundColor}>
                <View style={styles.footerItem}>
                    <Icon name={icon} size={20} style={[styles.footerItemIcon, styles.iconColor, colorStyle]}/>
                    <Text style={[styles.footerItemText, styles.iconColor, colorStyle]}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let favoritedStyle = {}
        if(this.props.data.favorited) {
            favoritedStyle = {color:'red'}
        }
        return (
            <View style={styles.footer}>
                <View style={styles.footerBg}/>
                {this._renderBotton('share', this._repost, '转发', this.props.data.reposts_count)}
                {this._renderBotton('comment-o', this._comment_create, '评论', this.props.data.comments_count)}
                {this._renderBotton('thumbs-o-up', this._change_favorite, '点赞', this.props.data.attitudes_count, favoritedStyle)}
            </View>
        )
    }

    _repost = ()=>{
        console.log('repost')
    }

    _comment_create = ()=>{
        console.log('comment create')
    }

    _change_favorite = ()=>{
        if(!this.props.data.favorited) {
            console.log('add favorite')
            this._addFavorite()
        } else {
            console.log('remove favorite')
            this._removeFavorite()
        }
    }

    @action
    _addFavorite = ()=>{
        this.props.data.favorited = true
        this.props.data.attitudes_count++
    }

    @action
    _removeFavorite = ()=>{
        this.props.data.favorited = false
        this.props.data.attitudes_count--
    }
}

export default class Item extends React.Component {

    _renderLinkText = () => {
        if(this.props.data.text) {
            return <LinkText text={this.props.data.text}/>
        }
        return null
    }

    _renderLinkMeida = () => {
        if(this.props.data.pic_urls) {
            return <LinkMedia pic_urls={this.props.data.pic_urls}/>
        }
        return null
    }

    _renderRetweented = ()=>{
        if(this.props.data.retweeted_status) {
            return (
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.args.showRetweentItemDetail && this.props.args.showRetweentItemDetail(this.props.data.retweeted_status)}>
                    <RetweentedItem data={this.props.data.retweeted_status}/>
                </TouchableOpacity>
            )
        }
        return null
    }

    _renderNull = () => {
        return <View/>
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.card_wrap} onPress={()=>this.props.args.showItemDetail && this.props.args.showItemDetail(this.props.data)}>
                <Header data={this.props.data.user}/>
                <View style={styles.main}>
                    <View style={styles.weibo_og}>
                        {this._renderLinkText()}
                        {this._renderLinkMeida()}
                    </View>
                    {this._renderRetweented()}
                </View>
                <Footer data={this.props.data}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card_wrap:{
        paddingTop: 15,
        marginBottom: 15,
        borderBottomColor: WBColor.lineColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerUserInfo: {
        flexDirection: 'row'
    },
    headerUserInfoProfile: {
        width:34,
        height:34,
        borderRadius: 17,
    },
    headerUserNameAndOtherInfo: {
        justifyContent: 'space-between',
        marginLeft:15,
    },
    main: {

    },
    weibo_og: {
        padding: 15,
    },
    footer: {
        flexDirection: 'row',
    },
    footerBg: {
        position: 'absolute',
        left:0,
        right:0,
        bottom:8,
        top:8,
        backgroundColor:WBColor.iconColor
    },
    footerLink:{
        flex:1,
        backgroundColor:'white',
        marginRight: StyleSheet.hairlineWidth,
        overflow: 'hidden',
        padding:8,
    },
    footerItem: {
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    footerItemIcon: {
        marginRight:10,
    },
    footerItemText: {
        fontWeight: '600',
        backgroundColor:'transparent',
    },
    iconColor: {
        color:WBColor.iconColor
    }
})