import ActionTypes from '../actions/ActionTypes'

function initState() {
    return {
        mainTab: 'home'
    }
}

export function Route(state = initState(), action) {
    switch(action.type) {
        case ActionTypes.CHANGE_MAIN_TAB:
            return {...state, mainTab:action.tab}
        default: 
            return state
    }
}