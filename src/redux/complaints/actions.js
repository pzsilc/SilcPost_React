import types from './types';

const fetchComplaintsList = list => ({
    type: types.FETCH_COMPLAINTS_LIST,
    list
});

const setNumOfPages = num => ({
    type: types.SET_NUM_OF_PAGES,
    num
})

const actions = {
    fetchComplaintsList,
    setNumOfPages
}

export default actions;