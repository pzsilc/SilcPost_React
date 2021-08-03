import types from './types';

const onChange = (name, value) => ({
    type: types.ON_CHANGE,
    name, 
    value
});

const reset = () => ({
    type: types.RESET
})

const actions = {
    onChange,
    reset
}

export default actions;