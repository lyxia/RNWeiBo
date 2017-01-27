import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
} from 'react-native'
import Header from '../commons/Header'
import Icon from 'react-native-vector-icons/Ionicons'

export default class AddTextWeiBo extends React.Component {

    constructor(props) {
        super(props)

        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
            <View style={styles.root}>
                <Header
                    left={Header.DefaultLeft(()=>this.props.navigator.pop(),<Icon name='ios-close' size={35}/>)}
                    title={Header.DefaultTitle("发微博")}
                />
               {/*<KeyboardAvoidingView behavior='height' keyboardVerticalOffset={15} style={styles.content}>*/}
                    <View style={styles.content}>
                        <View>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = '分享新鲜事...'
                                onChangeText={(text) => this.setState({text})}
                                // autoFocus = {true}
                                value={this.state.text}
                            />
                            <View style={styles.image}></View>
                        </View> 
                    </View>
                {/*</KeyboardAvoidingView>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor:'white',
    },
    content: {
        flex:1,
        backgroundColor:'red',
        marginTop: 15,
    },
    textInput: {
        height: 50
    }
})