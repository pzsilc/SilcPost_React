import types from './types';

const initState = {
    list: [],
    numOfPages: 1
}

const complaintsReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_COMPLAINTS_LIST:
            return {
                ...state,
                list: action.list
            }
        case types.SET_NUM_OF_PAGES:
            return {
                ...state,
                numOfPages: action.num
            }
        default:
            return state
    }
}

export default complaintsReducer;