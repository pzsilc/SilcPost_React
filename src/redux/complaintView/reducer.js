import types from './types';

const initState = {
    data: {},
    key: ""
}

const complaintViewReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_DATA:
            return {
                ...state,
                data: action.data
            }
        case types.SET_KEY:
            return {
                ...state,
                key: action.key
            }
        default:
            return state
    }
}

export default complaintViewReducer;