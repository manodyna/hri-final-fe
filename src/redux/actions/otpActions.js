// otpActions.js

export const SET_OTP_VALUE = 'SET_OTP_VALUE';

export const setOTPValue = (index, value) => ({
    type: SET_OTP_VALUE,
    index,
    value
});
