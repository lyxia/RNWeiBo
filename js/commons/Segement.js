import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import WBColor from '../commons/WBColor'

export default class SegementController extends React.Component {
    static propTypes = {
        ...View.propTypes,
        values: React.PropTypes.array,
        selectionColor: React.PropTypes.string,
        selectedIndex: React.PropTypes.number,
        onChange: React.PropTypes.func,
        style: React.PropTypes.object
    };

    render() {
        var segments = this.props.values.map(
            (value, index) => (
                <Segment
                    key={value}
                    value = {value}
                    isSelected={index===this.props.selectedIndex}
                    selectionColor={this.props.selectionColor||'white'}
                    onPress={()=>this.props.onChange(index)}
                />
            )
        )
        return (
            <View style={[styles.container, this.props.style]}>
                {segments}
            </View>
        )
    }
}

class Segment extends React.Component {
    static propTypes = {
        value: React.PropTypes.string,
        isSelected: React.PropTypes.bool,
        selectionColor: React.PropTypes.string,
        onPress: React.PropTypes.func
    };

    render() {
        var selectedButtonStyle;
        var selectedTextStyle;
        if (this.props.isSelected) {
            selectedButtonStyle = styles.selectionButtonColor;
            selectedTextStyle = styles.selectionTextColor;
        }
        var title = this.props.value;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.props.onPress}
                style={[styles.button, selectedButtonStyle]}>
                <Text style={[styles.label, selectedTextStyle]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  button: {
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    paddingHorizontal: 20,
  },
  label: {
    letterSpacing: 1,
    color: WBColor.iconColor,
  },
  selectionButtonColor:{
      borderBottomColor: '#ff8200',
  },
  selectionTextColor:{
      color: 'black'
  }
});