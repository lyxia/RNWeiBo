import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import {get_token_info} from '../server/API'
import {savaToken, removeToken} from '../actions/TokenAction'

class Loading extends React.Component {

    componentDidMount() {
        this.loadLocalStorage()
    }

    loadLocalStorage = async ()=>{
        try {
            await this.vaildToken()
        } catch (error) {
            console.log(error)
        }
    }

    vaildToken = async () => {
        console.log('vaildToken')
        //读取token
        try {
            const tokenInfo = await storage.load({key:'tokenInfo'})
            console.log(`tokeninfo = ${tokenInfo}`)
            const {access_token} = tokenInfo
            const responseJson = await get_token_info(access_token)
            this.props.savaToken({...responseJson, access_token:access_token})
        } catch (error) {
            console.log(error)
            this.props.removeToken()
        }
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
        savaToken: (data)=>dispatch(savaToken(data)),
        removeToken: ()=>dispatch(removeToken())
    }
}

module.exports = connect(null,makeDispatchToProps)(Loading)