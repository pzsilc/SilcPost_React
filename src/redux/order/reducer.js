import types from './types';

const initState = {
    order: {
        document: {},
        products: []
    }
}

const orderReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_REASONS:
            return {
                ...state,
                order: action.order
            }
        default:
            return state
    }
}

export default orderReducer;