import types from './types';

const initState = {
    result: {},
    data: {
        email: "",
        title: "",
        _description: "",
        document_number: "",
        reason_id: null,
        images: []
    }
}

const addComplaintReducer = (state = initState, action) => {
    switch(action.type){
        case types.UPDATE_FIELD:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.name]: action.value
                }
            }
        case types.SET_IMAGES:
            return {
                ...state,
                data: {
                    ...state.date,
                    images: action.images
                }
            }
        case types.FETCH_RESULT:
            return {
                ...state,
                result: action.data
            }
        default:
            return state
    }
}

export default addComplaintReducer;