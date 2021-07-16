import types from './types';

const setToken = token => ({
    type: types.SET_TOKEN,
    token
});

const remToken = () => ({
    type: types.REM_TOKEN
});

const actions = {
    setToken,
    remToken
}

export default actions;