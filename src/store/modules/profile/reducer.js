import {
EDIT_PROFILE_PIC,
EDIT_PROFILE_PIC_SUCCESS,
EDIT_PROFILE_PIC_FAIL,
EDIT_PROFILE,
EDIT_PROFILE_SUCCESS,
EDIT_PROFILE_FAIL,
DELETE_ACCOUNT,
DELETE_ACCOUNT_SUCCESS,
DELETE_ACCOUNT_FAIL,
PROFILE,
PROFILE_SUCCESS,
PROFILE_FAIL

} from './types';

const INITIAL_STATE = {
      profileData:null,
      profilePicData:null,
      deleteAc:null,
      profileData:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return {
                ...state,
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                profileData: action.data
            };
        case EDIT_PROFILE_FAIL:
            return {
                ...state,
            };
        case EDIT_PROFILE_PIC:
            return {
                ...state,
            };
        case EDIT_PROFILE_PIC_SUCCESS:
            return {
                ...state,
                profilePicData: action.data
            };
        case EDIT_PROFILE_PIC_FAIL:
            return {
                ...state,
            };

            case DELETE_ACCOUNT:
            return {
                ...state,
            };
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                deleteAc: action.data
            };
        case DELETE_ACCOUNT_FAIL:
            return {
                ...state,
            };

            case PROFILE:
                return {
                    ...state,
                };
            case PROFILE_SUCCESS:
                return {
                    ...state,
                    profileData: action.data
                };
            case PROFILE_FAIL:
                return {
                    ...state,
                };

        default:
            return state;
    }
};
