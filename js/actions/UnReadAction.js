import ActionTypes from '../actions/ActionTypes'
import {unread_count} from '../server/API' 

//拉取未读消息
export function fetchUnReadMessage() {
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.UNREAD_COUNT_START_FETCH
        })

        unread_count()
        .then((responseJson)=>{
            console.log(`unRead == ${JSON.stringify(responseJson)}`)
            dispatch({
                type: ActionTypes.UNREADE_COUNT_UPDATE,
                data: responseJson,
            })
        })
        .catch((error)=>{
            console.log(error)
        }) 
    }
}

//置空某未读消息
export function setEmptyUnReadForCategory(category) {
    console.log('setEmptyUnReadForCategory')
    return {
        type: ActionTypes.UNREADE_COUNT_CLEAR,
        category
    }
}