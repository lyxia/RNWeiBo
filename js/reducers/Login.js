import ActionTypes from '../actions/ActionTypes'

export const AppStateCode = {
    LOGIN: 'LOGIN',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOADING: 'LOADING',
}

function initState() {
    return {
        status: AppStateCode.LOADING,
        userInfo: null
    }
}

export function Login(state = initState(), action) {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {status:AppStateCode.LOGIN, userInfo:action.userInfo}
        case ActionTypes.LOGIN_FAILURE:
            return {status:AppStateCode.LOGIN_FAILURE, userInfo:null}
        default:
            return state
    }
}