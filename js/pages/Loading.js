import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import {login} from '../actions/LoginAction'

class Loading extends React.Component {

    componentDidMount() {
        this.props.login()
    }

    render() {
        console.log('render loading...')
        return (
            <View style={styles.root}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function makeDispatchToProps(dispatch) {
    return {
        login: ()=>dispatch(login()),
    }
}

module.exports = connect(null,makeDispatchToProps)(Loading)