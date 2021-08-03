import types from './types';

const initState = {
    username: "",
    password: "",
    admin: null,
    error: null
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case types.UPDATE_INPUT:
            return {
                ...state,
                [action.name]: action.value
            }
        case types.FETCH_ADMIN:
            return {
                ...state,
                admin: action.admin
            }
        case types.SET_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default loginReducer;