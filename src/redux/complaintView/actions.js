import types from './types';

const fetchData = data => ({
    type: types.FETCH_DATA,
    data
})

const setKey = key => ({
    type: types.SET_KEY,
    key
})

const actions = {
    fetchData,
    setKey
}

export default actions;