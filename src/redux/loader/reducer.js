import types from './types';

const initState = {
    loading: true
}

const reasonsReducer = (state = initState, action) => {
    switch(action.type){
        case types.TURN_OFF_LOADER:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reasonsReducer;