import types from './types';

const fetchComplaintsList = list => ({
    type: types.FETCH_COMPLAINTS_LIST,
    list
});

const actions = {
    fetchComplaintsList
}

export default actions;