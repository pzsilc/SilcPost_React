import types from './types';

const fetchReasons = reasons => ({
    type: types.FETCH_REASONS,
    reasons
});

const actions = {
    fetchReasons
}

export default actions;