import types from './types';

const initState = {
    reasons: []
}

const reasonsReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_REASONS:
            return {
                ...state,
                reasons: action.reasons
            }
        default:
            return state
    }
}

export default reasonsReducer;