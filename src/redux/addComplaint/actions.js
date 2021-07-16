import types from './types';

const updateField = (name, value) => ({
    type: types.UPDATE_FIELD,
    name,
    value
})

const setImages = images => ({
    type: types.SET_IMAGES,
    images
})

const fetchResult = data => ({
    type: types.FETCH_RESULT,
    data
})

const actions = {
    updateField,
    setImages,
    fetchResult
}

export default actions;