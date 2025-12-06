import { combineReducers } from 'redux';
import {otpReducer} from "./otpReducers";

const rootReducer = combineReducers({
    otpReducer: otpReducer,
});

export default rootReducer;