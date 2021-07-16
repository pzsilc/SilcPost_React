import types from './types';

const fetchOrder = order => ({
    type: types.FETCH_ORDER,
    order
});

const actions = {
    fetchOrder
}

export default actions;