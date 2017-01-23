import ActionTypes from './ActionTypes'

export function changeMainTab(tab) {
    return {
        type: ActionTypes.CHANGE_MAIN_TAB,
        tab: tab
    }
}