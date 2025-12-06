// otpReducer.js

import { SET_OTP_VALUE } from '../actions/otpActions';

const initialState = {
    values: Array(6).fill('')
};

export const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OTP_VALUE:
            const newValues = [...state.values];
            newValues[action.index] = action.value;
            return { ...state, values: newValues };
        default:
            return state;
    }
};
