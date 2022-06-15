import { onlineFail } from './actions';
import {
    CATEGORIES,
    CATEGORIES_SUCCESS,
    CATEGORIES_FAIL,
    SUPPLIERS,
    SUPPLIERS_SUCCESS,
    SUPPLIERS_FAIL,
    SPARE_PARTS,
    SPARE_PARTS_SUCCESS,
    SPARE_PARTS_FAIL,
    MECHANICS,
    MECHANICS_SUCCESS,
    MECHANICS_FAIL,
    ONLINE,
    ONLINE_SUCCESS,
    ONLINE_FAIL,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL
} from './types';

const INITIAL_STATE = {
    categories: [],
    suppliers: [],
    spareParts: [],
    mechanics: [],
    onOffLine: null,
    updateCategory:[]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES:
            return {
                ...state,
            };
        case CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data
            };
        case CATEGORIES_FAIL:
            return {
                ...state,
            };

        case SUPPLIERS:
            return {
                ...state,
            };
        case SUPPLIERS_SUCCESS:
            return {
                ...state,
                suppliers: action.data
            };
        case SUPPLIERS_FAIL:
            return {
                ...state,
            };

        case SPARE_PARTS:
            return {
                ...state,
            };
        case SPARE_PARTS_SUCCESS:
            return {
                ...state,
                spareParts: action.data
            };
        case SPARE_PARTS_FAIL:
            return {
                ...state,
            };

        case MECHANICS:
            return {
                ...state,
            };
        case MECHANICS_SUCCESS:
            return {
                ...state,
                mechanics: action.data
            };
        case MECHANICS_FAIL:
            return {
                ...state,
            };
        case ONLINE:
            return {
                ...state,
            };
        case ONLINE_SUCCESS:
            return {
                ...state,
                onOffLine: action.data
            };
        case ONLINE_FAIL:
            return {
                ...state,
            };

            case UPDATE_CATEGORY:
                return {
                    ...state,
                };
            case UPDATE_CATEGORY_FAIL:
                return {
                    ...state,
                    updateCategory: action.data
                };
            case UPDATE_CATEGORY_FAIL:
                return {
                    ...state,
                };


        default:
            return state;
    }
};
