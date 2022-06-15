import {
    EDIT_PROFILE_PIC,
    EDIT_PROFILE_PIC_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_PIC_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAIL,
    PROFILE,
    PROFILE_SUCCESS,
    PROFILE_FAIL
} from './types';


export const editProfilePicRequest = (data, cb) => ({
    type: EDIT_PROFILE_PIC,
    data,
    cb,
});
export const editProfilePicSuccess = data => (
    {
        type: EDIT_PROFILE_PIC_SUCCESS,
        data
    }
);
export const editProfilePicFail = () => (
    {
        type: EDIT_PROFILE_PIC_FAIL
    }
);

export const editProfileRequest = (data, navigation) => ({
    type: EDIT_PROFILE,
    data,
    navigation,
});
export const editProfileSuccess = data => (
    {
        type: EDIT_PROFILE_SUCCESS,
        data
    }
);
export const editProfileFail = () => (
    {
        type: EDIT_PROFILE_FAIL
    }
);


export const changePasswordRequest = (data, navigation) => ({
    type: CHANGE_PASSWORD,
    data,
    navigation,
});
export const changePAsswordSuccess = data => (
    {
        type: CHANGE_PASSWORD_SUCCESS,
        data
    }
);
export const chnagePasswordFail = () => (
    {
        type: CHANGE_PASSWORD_FAIL
    }
);

export const deleteAccountrequest = () => ({
    type: DELETE_ACCOUNT,
});
export const deleteAccountSuccess = data => (
    {
        type: DELETE_ACCOUNT_SUCCESS,
        data
    }
);
export const deleteAccountFail = () => (
    {
        type: DELETE_ACCOUNT_FAIL
    }
);

export const profilerequest = () => ({
    type: PROFILE,
});
export const profileSuccess = data => (
    {
        type: PROFILE_SUCCESS,
        data
    }
);
export const profileFail = () => (
    {
        type: PROFILE_FAIL
    }
);