import {friends} from '../server/API'
import ActionTypes from './ActionTypes'

export function fetchFriendsList() {
    return (dispatch)=>{
        friends()
        .then((responseJson)=>{
            dispatch({
                type:ActionTypes.FRIENDLIST_UPDATE,
                data:responseJson.users,
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}