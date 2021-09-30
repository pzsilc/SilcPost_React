import types from './types';
import packageJson from '../../../package.json';
const tokenName = packageJson.authKey;

const initState = {
    token: window.localStorage.getItem(tokenName),
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case types.SET_TOKEN: {
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
        case types.FETCH_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        default:
            return state
    }
}

export default authReducer;