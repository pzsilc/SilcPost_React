import types from './types';

const fetchStatuses = statuses => ({
    type: types.FETCH_STATUSES,
    statuses
});

const actions = {
    fetchStatuses
}

export default actions;