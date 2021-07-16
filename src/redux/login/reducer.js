import types from './types';

const initState = {
    username: "",
    password: "",
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case types.UPDATE_INPUT:
            return {
                ...state,
                [action.name]: action.value
            }
        default:
            return state
    }
}

export default loginReducer;