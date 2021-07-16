import types from './types';

const initState = {
    statuses: []
}

const statusesReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_STATUSES:
            return {
                ...state,
                statuses: action.statuses
            }
        default:
            return state
    }
}

export default statusesReducer;