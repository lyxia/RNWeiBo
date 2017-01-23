//html

import React from 'react'
import {
    View,
    WebView,
    Text,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    root: {
    },
    contentText: {
        fontSize: 12
    }
})

export default class LinkText extends React.Component {
    render () {
        return (
            <View style={[styles.root, this.props.style]}>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
}