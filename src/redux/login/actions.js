import types from './types';

const updateInput = (name, value) => ({
    type: types.UPDATE_INPUT,
    name,
    value
});

const actions = {
    updateInput
}

export default actions;