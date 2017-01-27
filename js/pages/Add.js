import React from 'react'
import {
    View,
    Animated,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Text,
    Navigator,
    Easing,
} from 'react-native'
import Dimensions from 'Dimensions'
import PixelRatio from 'PixelRatio'

import {BlurView} from 'react-native-blur'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddTextWeiBo from './AddTextWeiBo'

class IconButton extends React.Component {

    constructor(props) {
        super(props)
    }

    _highlight = ()=>{
        this.props.touchHandler(this.props.index, true)
    }

    _normal = () => {
        this.props.touchHandler(this.props.index, false)
    }

    _onRelease = ()=>{
        this.props.clickHandler(this.props.index)
    }

    render() {
        return (
            <TouchableWithoutFeedback 
                onPressIn={this._highlight}
                onPressOut={this._normal}
                onPress={this._onRelease}
            >
                <View style = {styles.iconButton}>
                    <Ionicons name={this.props.name} size={90} color={this.props.color}/>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const maxBottom = 200
const iconHeight = 102
const paddingV = 35
const paddingLeft = 20
const columnCount = 3
const iconWidth = 80

export default class AddView extends React.Component {
    constructor(props) {
        super(props)

        this.iconButtonsConfig = [
            {
                name:'ios-at',
                text:'文字',
                color:'#ff0202',
            },
            {
                name:'ios-at',
                text:'照片/视频',
                color:'#ff0202',
            },
            {
                name:'ios-at',
                text:'头条文章',
                color:'#ff0202',
            },
            {
                name:'ios-at',
                text:'红包',
                color:'#ff0202',
            },
            {
                name:'ios-at',
                text:'直播',
                color:'#ff0202',
            },
            {
                name:'ios-at',
                text:'更多',
                color:'#ff0202',
            },
            
        ]
        this.iconLength = this.iconButtonsConfig.length
        this.state = {
            rotation: new Animated.Value(0),
            opacityAnims: this.iconButtonsConfig.map(()=>new Animated.Value(0)),//透明度
            bottomAnims: this.iconButtonsConfig.map(()=>new Animated.Value(0)),//距离底部
            scaleAnims: this.iconButtonsConfig.map(()=>new Animated.Value(1)),//伸缩
        }
        this.paddingH = (Dimensions.get('window').width - paddingLeft * 2 - iconWidth * columnCount) / (columnCount - 1)
    }

    //界面出现时的动画
    componentDidMount() {
        //把长度补齐
        let sub = this.iconLength%columnCount
        if(sub === 0) {
            sub = 3
        }
        const length = this.iconLength + columnCount - sub - 1
        //刚出来的动画，x旋转,icon从底部出来
        //bottom从0-maxBottom
        //opacity从0-1
        Animated.parallel([
            //x旋转
            Animated.timing(
                this.state.rotation,
                {
                    toValue:1,
                    duration: 150,
                }
            ),
            //opacity从0-1,时间间隔50ms
            Animated.stagger(20,this.state.opacityAnims.map((anim, ii)=>{
                //opacity和bottom一起改变
                return Animated.timing(
                            anim,
                            {
                                toValue:1,
                                duration: 150
                            }
                        )
            })),
            //bottom从0-maxBottom,时间间隔50ms
            Animated.stagger(20, this.state.bottomAnims.map((anim, ii)=>{
                return Animated.spring(
                            anim,
                            {
                                toValue:parseInt((length - ii) / columnCount) * (iconHeight+paddingV) + maxBottom,
                                duration: 150,
                                friction: 6,
                            }
                        )
            })),
        ]).start()
    }

    //界面消失时的动画
    _closeHander = ()=>{
        //改变数组序列
        let arr = this.iconButtonsConfig.map((v,ii)=>ii)
        arr = arr.reverse()
        //刚出来的动画，x旋转,icon回到底部去
        //bottom从maxBottom-0
        //opacity从1-0
        Animated.parallel([
            //x旋转
            Animated.timing(
                this.state.rotation,
                {
                    toValue:0,
                    duration: 300
                }
            ),
            //时间间隔50ms, opacity从1-0,bottom从maxBottom - -iconHeight
            Animated.stagger(50,arr.map((curIndex)=>{
                return Animated.parallel([
                    Animated.timing(
                        this.state.opacityAnims[curIndex],
                        {
                            toValue: 0,
                            duration: 300,
                        }
                    ),
                    Animated.timing(
                        this.state.bottomAnims[curIndex],
                        {
                            toValue: -iconHeight,
                            duration: 300
                        }
                    )
                ])
            }))
        ]).start((complete)=>{
            this.props.onClose()
        })
    }

    //点击按钮后的动画
    _pushDetail = (index)=>{
        //opacity从1-0
        //被选中的scale到2
        //没被选中的scale到0
        Animated.parallel(this.iconButtonsConfig.map((v,ii)=>{
            if(ii == index) {
                //这是被选中的动画
                return Animated.parallel([
                    Animated.timing(
                        this.state.opacityAnims[ii],
                        {
                            toValue: 0,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.scaleAnims[ii],
                        {
                            toValue: 2,
                            duration: 200,
                        }
                    )
                ])
            }
            //这是没有被选中的动画
            return Animated.parallel([
                    Animated.timing(
                        this.state.opacityAnims[ii],
                        {
                            toValue: 0,
                            duration: 200
                        }
                    ),
                    Animated.timing(
                        this.state.scaleAnims[ii],
                        {
                            toValue: 0,
                            duration: 200,
                        }
                    )
                ])
        })).start((complete)=>{
            //push
            this.props.navigator.push({component:AddTextWeiBo, SceneConfigs:Navigator.SceneConfigs.FloatFromBottom, enableGestures:false})
        })
    }

    //某个按钮被触摸/取消触摸时的动画
    _touchIconHander = (index, touch)=>{
        //scale改变
        Animated.timing(
            this.state.scaleAnims[index],
            {
                toValue: touch?1.2:1,
                duration: 150,
            }
        ).start()
    }

    render () {
        return (
            <BlurView
                blurType='light'
                blurAmount={50}
                style={[styles.root,this.props.style]}
                onStartShouldSetResponder = {()=>true}
                onMoveShouldSetResponder = {()=>true}
                onResponderGrant = {()=>this.click=true}
                onResponderMove = {()=>this.click=false}
                onResponderTerminate = {()=>this.click=false}
                onResponderRelease = {()=>{if(this.click){this._closeHander()}}}
            >
                {
                    this.iconButtonsConfig.map((config,ii)=>{
                        return (
                            <Animated.View
                                key={ii}
                                style={[
                                    styles.iconView, 
                                    {
                                        bottom: this.state.bottomAnims[ii],
                                        opacity: this.state.opacityAnims[ii],
                                        left: (ii % columnCount) * (iconWidth + this.paddingH) + paddingLeft
                                    },
                                    {transform:[
                                        {scale: this.state.scaleAnims[ii]}
                                    ]}
                                ]
                            }>
                                <IconButton
                                    navigator = {this.props.navigator}
                                    color={config.color}
                                    name={config.name}
                                    text={config.text}
                                    index={ii}
                                    touchHandler={this._touchIconHander}
                                    clickHandler={this._pushDetail}
                                />
                            </Animated.View>
                        )
                    })
                }
                    <TouchableOpacity activeOpacity={1} onPress={this._closeHander} style={styles.close}>
                        <Animated.View 
                            style={[{backgroundColor:'rgba(0,0,0,0)'},{
                                transform:[
                                    {rotate: this.state.rotation.interpolate({inputRange:[0,1],outputRange:['0deg','45deg']})}
                                ]
                            }]}
                        >
                            <Ionicons name='ios-add' size={40} fontWeight={100} color='#ffa200'/>
                        </Animated.View>
                    </TouchableOpacity>
            </BlurView>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        // justifyContent:'space-between'
    },
    close:{
        backgroundColor:'white',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:45,
    },
    iconView:{
        position:'absolute',
    },
    iconButton: {
        justifyContent:'center',
        alignItems:'center',
    }
})