//html

import React from 'react'
import {
    View,
    WebView,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import weiboticons from '../utils/weiboticons'

const styles = StyleSheet.create({
    root: {
    },
    contentText: {
        fontSize: 12
    }
})

const httpCheck = ''

export default class LinkText extends React.Component {

    constructor(props){
        super(props)

        let arr = weiboticons.replace(this.props.text)
        this.inlineText = this._renderRichText(arr)
    }

    _renderRichText = (arr) => {
        return arr.map((value, ii) => {
            const arr = value.split('||')
            if (arr.length > 1) {
                switch (arr[0]) {
                    case 'emoji':
                        return <Image key={ii} source={{ uri: arr[1] }} style={{ width: 20, height: 20 }} />
                    default:
                        return arr[1]
                }
            }
            return arr[0]
        })
    }

    componentWillReceiveProps(nextProps) {
        let arr = weiboticons.replace(nextProps.text)
        this.inlineText = this._renderRichText(arr)
    }

    render () {
        return (
            <View style={[styles.root, this.props.style]}>
                <Text>{this.inlineText}</Text>
            </View>
        )
    }
}