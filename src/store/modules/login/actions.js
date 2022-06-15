import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    LOGOUT_REQUESTED,
    LOGOUT_REQUEST_SUCCESS,
    LOGOUT_REQUEST_FAIL,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAIL,
    TERMS_CONDITIONS,
    TERMS_CONDITIONS_SUCCESS,
    TERMS_CONDITIONS_FAIL
} from './types';


export const registerRequest = (data, navigation) => ({
    type: REGISTER,
    data,
    navigation,
});
export const registerSuccess = data => (
    {
        type: REGISTER_SUCCESS,
        data
    }
);
export const registerFail = () => (
    {
        type: REGISTER_FAIL
    }
);

export const loginRequest = (data, navigation) => ({
    type: LOGIN,
    data,
    navigation,
});
export const loginSuccess = data => (
    {
        type: LOGIN_SUCCESS,
        data
    }
);
export const loginFail = () => (
    {
        type: LOGIN_FAIL
    }
);

export const logoutRequest = (navigation) => ({
    type: LOGOUT_REQUESTED,
    navigation,
});

export const logoutSuccess = data => ({
    type: LOGOUT_REQUEST_SUCCESS,
    data,
});
export const logoutFail = () => ({
    type: LOGOUT_REQUEST_FAIL,
});

export const socialLoginRequest = (data, navigation) => ({
    type: SOCIAL_LOGIN,
    data,
    navigation,
});
export const socialLoginSuccess = data => (
    {
        type: SOCIAL_LOGIN_SUCCESS,
        data
    }
);
export const socialLoginFail = () => (
    {
        type: SOCIAL_LOGIN_FAIL
    }
);

export const forgotPasswordRequest = (data, navigation) => ({
    type: FORGOT_PASSWORD,
    data,
    navigation,
});
export const forgotPasswordSuccess = data => (
    {
        type: FORGOT_PASSWORD_SUCCESS,
        data
    }
);
export const forgotPasswordFail = () => (
    {
        type: FORGOT_PASSWORD_FAIL
    }
);


export const resetPasswordRequest = (data,navigation) => ({
    type: RESET_PASSWORD,
    data,
    navigation,
});

export const resetPasswordSuccess = data => ({
    type: RESET_PASSWORD_SUCCESS,
    data,
});
export const resetPasswordFail = () => ({
    type: RESET_PASSWORD_FAIL,
});


export const verifyOtpRequest = (data,screenType,cb,navigation) => ({
    type: VERIFY_OTP,
    data,
    screenType,
    cb,
    navigation,
});

export const verifyOtpSuccess = data => ({
    type: VERIFY_OTP_SUCCESS,
    data,
});
export const verifyOtpFail = () => ({
    type: VERIFY_OTP_FAIL,
});

export const resendOtpRequest = (data,cb,navigation) => ({
    type: RESEND_OTP,
    data,
    cb,
    navigation,
});

export const resendOtpSuccess = data => ({
    type: RESEND_OTP_SUCCESS,
    data,
});
export const resendOtpFail = () => ({
    type: RESEND_OTP_FAIL,
});

export const termsConditionsRequest = (cb) => ({
    type: TERMS_CONDITIONS,
    cb
});

export const termsConditionsSuccess = data => ({
    type: TERMS_CONDITIONS_SUCCESS,
    data,
});
export const termsConditionsFail = () => ({
    type: TERMS_CONDITIONS_FAIL,
});

