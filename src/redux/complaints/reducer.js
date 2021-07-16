import types from './types';

const initState = {
    list: []
}

const complaintsReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_COMPLAINTS_LIST:
            return {
                ...state,
                list: action.list
            }
        default:
            return state
    }
}

export default complaintsReducer;