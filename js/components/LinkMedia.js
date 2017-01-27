//图片

import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    column: {
        flex:1,
        marginTop:15,
    },
    row: {
        flexDirection:'row',
    },
    image: {
        height: 140
    },
    cell: {
        flex:1,
        margin:2.5
    },
})

export default class LinkMedia extends React.Component {

    _renderImage= (urls,i,rowId)=>{
        if(urls.length <= i) {
            if(rowId == 0 && urls.length == 1) {
                return null
            } else {
                return (
                    <View key={i} style={styles.cell}/>
                )
            }
        }
        let bmiddle_url = urls[i].thumbnail_pic.replace('thumbnail', 'bmiddle')
        return (
            <View style={styles.cell} key={i}>
                <Image 
                    style={styles.image} 
                    source={{uri:bmiddle_url}}
                />
            </View>
        )
    }

    _renderRow = (urls, rowId) => {
        let arr = []
        for (let i=0;i<3;i++) {
            arr.push(this._renderImage(urls,i,rowId))
        }
        return arr
    }

    _renderPics = (pic_urls)=>{
        if(pic_urls == null || pic_urls.length == 0) {
            return null
        }

        let arr = []
        let isOver = false
        for (let i=0; i<3; i++) {
            arr[i] = []
            for(let j=0; j<3; j++) {
                let index = i*3 + j
                if(index >= pic_urls.length) {
                    isOver = true
                    break
                }
                arr[i].push(pic_urls[index])
            }
            if(isOver) {
                break
            }
        }

        let views = []
        for(let i=0; i<arr.length; i++) {
            views.push(
                <View key={i} style={styles.row}>
                    {this._renderRow(arr[i],i)}
                </View>
            )
        }

        return views
    }

    render () {
        return (
            <View style={styles.column}>
                {this._renderPics(this.props.pic_urls)}
            </View>
        )
    }
}