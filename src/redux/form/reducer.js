import types from './types'

const initState = {
    mode: types.NEW_MODE,
    data: {
        recipint_name: "",
        street: "",
        home_nb: "",
        zip_code: "",
        city: "",
        recipint_email: "",
        recipint_phone_number: "",
        courier_name: "",
        on_delivery: false,
        account_number: "",
        order_number: "",
        client_name: "",
        location: null,
        where_is_package: ""
    }
}

export default (state = initState, action) => {
    switch(action.type){
        case types.SET_FIELD:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.name]: action.value
                }
            }
        case types.SWITCH_MODE:
            return {
                ...state,
                mode: action.mode
            }
        case types.RESET:
            return {
                ...state,
                data: initState.data
            }
        default:
            return state
    }
}