import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SOCIAL_LOGIN,
    SOCIAL_LOGIN_SUCCESS,
    SOCIAL_LOGIN_FAIL,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
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

const INITIAL_STATE = {
    LoginCheckData: null,
    loginData: null,
    socialLoginData: null,
    forgotPasswordData: null,
    resetPassword: null,
    verifyOtp: null,
    resendOtp: null,
    termsData: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loginData: action.data
            };
        case REGISTER_FAIL:
            return {
                ...state,
            };
        case LOGIN:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginData: action.data
            };
        case LOGIN_FAIL:
            return {
                ...state,
            };

        case SOCIAL_LOGIN:
            return {
                ...state,
            };
        case SOCIAL_LOGIN_SUCCESS:
            return {
                ...state,
                socialLoginData: action.data
            };
        case SOCIAL_LOGIN_FAIL:
            return {
                ...state,
            };

        case FORGOT_PASSWORD:
            return {
                ...state,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordData: action.data
            };

        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
            };
        case RESET_PASSWORD:
            return {
                ...state,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPassword: action.data
            };

        case RESET_PASSWORD_FAIL:
            return {
                ...state,
            };

        case VERIFY_OTP:
            return {
                ...state,
            };
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyOtp: action.data
            };

        case VERIFY_OTP_FAIL:
            return {
                ...state,
            };
        case RESEND_OTP:
            return {
                ...state,
            };
        case RESEND_OTP_SUCCESS:
            return {
                ...state,
                resendOtp: action.data
            };

        case RESEND_OTP_FAIL:
            return {
                ...state,
            };

            case TERMS_CONDITIONS:
            return {
                ...state,
            };
        case TERMS_CONDITIONS_SUCCESS:
            return {
                ...state,
                termsData: action.data
            };

        case TERMS_CONDITIONS_FAIL:
            return {
                ...state,
            };




        default:
            return state;
    }
};
