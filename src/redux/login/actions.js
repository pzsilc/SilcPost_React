import types from './types';

const updateInput = (name, value) => ({
    type: types.UPDATE_INPUT,
    name,
    value
});

const fetchAdmin = admin => ({
    type: types.FETCH_ADMIN,
    admin
});

const setError = () => ({ type: types.SET_ERROR })

const actions = {
    updateInput,
    fetchAdmin,
    setError
}

export default actions;