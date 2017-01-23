import ActionTypes from '../actions/ActionTypes'

export const AppStateCode = {
    LOGIN: 'LOGIN',
    UN_LOGIN: 'UN_LOGIN',
    LOADING: 'LOADING',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGINING: 'LOGINING',
}

function initState() {
    return AppStateCode.LOADING
}

export function AppState(state = initState(), action) {
    switch(action.type) {
        case ActionTypes.TOKEN_SAVE:
            return AppStateCode.LOGIN
        case ActionTypes.TOKEN_REMOVE:
            return AppStateCode.UN_LOGIN
        case ActionTypes.TOKEN_FETCH:
            return AppStateCode.LOGINING
        case ActionTypes.TOKEN_FETCH_FAILURE:
            return AppStateCode.LOGIN_FAILURE
        default:
            return state
    }
}