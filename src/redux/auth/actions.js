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

export default {
    setToken,
    remToken,
    fetchUser
}