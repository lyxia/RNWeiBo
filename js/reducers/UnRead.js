import ActionTypes from '../actions/ActionTypes'

function initState() {
    return {
        isRefresh: false,
        data:{}
    }
}

export function UnRead(state = initState(), action) {
    switch(action.type) {
        case ActionTypes.UNREAD_COUNT_START_FETCH: 
            return {isRefresh:true, data:{}}
        case ActionTypes.UNREADE_COUNT_UPDATE:
            return {isRefresh:false, data:action.data}
        case ActionTypes.UNREADE_COUNT_CLEAR:
            let copyData = Object.assign({},state.data)
            copyData[action.category] = 0
            return {isRefresh:false, data:copyData}
        default:
            return state
    }
}