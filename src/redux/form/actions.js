import types from './types'

const setField = (name, value) => ({
    type: types.SET_FIELD,
    name,
    value
})

const switchMode = mode => ({
    type: types.SWITCH_MODE,
    mode
})

const reset = () => ({
    type: types.RESET
})

export default {
    setField,
    switchMode,
    reset
}