import types from './types'

const initState = {
    list: []
}

export default (state = initState, action) => {
    switch(action.type){
        case types.FETCH_LOCATIONS:
            return {
                ...state,
                list: action.locations
            }
        default:
            return state
    }
}