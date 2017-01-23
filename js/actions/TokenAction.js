import ActionTypes from '../actions/ActionTypes'
import {access_token} from '../server/API'

export let tokenInfo = null

export function savaToken(info) {
    return (dispatch) => {
        storage.save({
            key: 'tokenInfo',
            rawData: info,
            expires: info.expires_in || info.expire_in
        })
        .then(()=>{
            tokenInfo = info
            dispatch({
                type: ActionTypes.TOKEN_SAVE,
                info
            })
        })
        .catch((error)=>{
            console.error(error.stack)
        })
    }
}

export function removeToken() {
    return (dispatch)=>{
        storage.remove({
            key:'tokenInfo'
        })
        .then(()=>{
            tokenInfo = null
            dispatch({
                type: ActionTypes.TOKEN_REMOVE
            })
        })
        .catch((error)=>{
            console.error(error.stack)
        })
    }
}
export function fetchToken(code) {
    console.log(`fetch ${access_token}`)
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.TOKEN_FETCH
        })

        access_token(code)
        .then((responseJson)=>{
            dispatch(savaToken(responseJson))
        })
        .catch((error)=>{
            dispatch(fetchTokenFailure())
        })
    }
}
export function fetchTokenFailure() {
    return {
        type: ActionTypes.TOKEN_FETCH_FAILURE
    }
}