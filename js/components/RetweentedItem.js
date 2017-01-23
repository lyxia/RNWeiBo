import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import LinkText from './LinkText'
import LinkMedia from './LinkMedia'
import WBColor from '../commons/WBColor'

const styles = StyleSheet.create({
    weibo_rp: {
        padding: 15,
        backgroundColor:WBColor.backgroundColor
    },
})

export default class RetweentedItem extends React.Component {
    _renderLinkText = () => {
        if(this.props.data.text) {
            const text = `@${this.props.data.user.screen_name} ${this.props.data.text}`
            return <LinkText text={text}/>
        }
        return null
    }

    _renderLinkMeida = () => {
        if(this.props.data.pic_urls) {
            return <LinkMedia pic_urls={this.props.data.pic_urls}/>
        }
        return null
    }

    render () {
        return (
            <View style={styles.weibo_rp}>
                {this._renderLinkText()}
                {this._renderLinkMeida()}
            </View>
        )
    }
}