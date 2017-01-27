import ActionTypes from '../actions/ActionTypes'
import {isEmptyValue} from '../utils/utils'

function initState() {
    return []
}

export function Friend(state = initState(), action) {
    switch(action.type) {
        case ActionTypes.FRIENDLIST_UPDATE:
            return action.data
        default:
            return state
    }
}