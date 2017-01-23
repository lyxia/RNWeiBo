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
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <Icon name='thumbs-o-up' size={20} style={styles.iconColor}/>
                </View>
            </View>
        )
    }
}

export default class ReplayItem extends React.Component {
    _renderLinkText = () => {
        if(this.props.data.text) {
            const text = this.props.data.text
            return <LinkText text={text} style={styles.text}/>
        }
        return null
    }

    render () {
        return (
            <View style={styles.root}>
                <Header data={this.props.data.user}/>
                {this._renderLinkText()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        paddingVertical:15,
        backgroundColor:'white'
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
    iconColor: {
        color:WBColor.iconColor
    },
    text:{
        paddingLeft:64,
        paddingRight:15,
    }
})