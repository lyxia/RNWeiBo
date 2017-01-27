import WBColor from './WBColor'
import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends React.Component {

  static propTypes = {
        left: React.PropTypes.element,
        title: React.PropTypes.element,
        right: React.PropTypes.element
    };

  render() {
    return (
      <View style={[styles.header, this.props.style]}>
        {this.props.left || <View/>}
        {this.props.title || <View/>}
        {this.props.right || <View/>}
      </View>
    )
  }
}

Header.DefaultLeft = (onPress, icon=null) => {
    return (
        <TouchableOpacity onPress={onPress}>
           {icon || <Icon name='angle-left' size={35}/>}
        </TouchableOpacity> 
    )
}

Header.DefaultTitle = (title) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height:64,
    paddingTop:20,
    paddingHorizontal: 15,
    backgroundColor:'white',
    borderBottomColor:WBColor.lineColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  }
})