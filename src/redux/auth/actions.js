import types from './types';

const setToken = token => ({
    type: types.SET_TOKEN,
    token
});

const remToken = () => ({
    type: types.REM_TOKEN
});

const fetchUser = user => ({
	type: types.FETCH_USER,
	user
})

const actions = {
    setToken,
    remToken,
    fetchUser
}

export default actions;