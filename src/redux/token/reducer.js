import types from './types';

const tokenName = 'complaintsAccessToken';

const initState = {
    token: window.localStorage.getItem(tokenName)
}

const tokenReducer = (state = initState, action) => {
    switch(action.type){
        case types.SET_TOKEN: {
            console.log(action.token);
            window.localStorage.setItem(tokenName, action.token);
            return {
                ...state,
                token: action.token
            }
        }
        case types.REM_TOKEN: {
            window.localStorage.removeItem(tokenName);
            return {
                ...state,
                token: null
            }
        }
        default:
            return state
    }
}

export default tokenReducer;