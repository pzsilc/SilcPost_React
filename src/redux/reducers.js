import { combineReducers } from 'redux';
import addComplaintReducer from './addComplaint/reducer';
import complaintViewReducer from './complaintView/reducer';
import complaintsReducer from './complaints/reducer';
import reasonsReducer from './reasons/reducer';
import statusesReducer from './statuses/reducer';
import loaderReducer from './loader/reducer';
import loginReducer from './login/reducer';
import tokenReducer from './token/reducer';
import orderReducer from './order/reducer';

export default combineReducers({
    addComplaint: addComplaintReducer,
    complaintView: complaintViewReducer,
    complaints: complaintsReducer,
    reasons: reasonsReducer,
    statuses: statusesReducer,
    loader: loaderReducer,
    login: loginReducer,
    token: tokenReducer,
    order: orderReducer
});
