import { combineReducers } from 'redux'
import authReducer from './auth'
import locationsReducer from './locations'
import formReducer from './form'

export default combineReducers({
    auth: authReducer,
    locations: locationsReducer,
    form: formReducer
})
