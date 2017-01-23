import React from 'react'
import {
    Image,
    View,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    column: {
        flex:1,
       // justifyContent:'flex-start'
    },
    row: {
        flexDirection:'row',
        backgroundColor:'red'
    },
    image: {
        height: 140
    },
    cell: {
        flex:1,
        margin:2.5
    },
})

export default class Test extends React.Component {
    render() {
        return (
            <View style={styles.column}>
                 <View style={styles.row}>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                    <View style={styles.cell}>
                        <Image style={styles.image} source={{uri:'http://wx3.sinaimg.cn/thumbnail/89dea615gy1fbx783lq5dj20m80uj78v.jpg'}}/>
                    </View>
                </View>
            </View>
        )
    }
}