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

export const categoriesRequest = (cb) => ({
    type: CATEGORIES,
    cb
});
export const categoriesSuccess = data => (
    {
        type: CATEGORIES_SUCCESS,
        data
    }
);
export const categoriesFail = () => (
    {
        type: CATEGORIES_FAIL
    }
);

export const supplierRequest = (data,navigation) => ({
    type: SUPPLIERS,
    data,
    navigation
});
export const supplierSuccess = data => (
    {
        type: SUPPLIERS_SUCCESS,
        data
    }
);
export const supplierFail = () => (
    {
        type: SUPPLIERS_FAIL
    }
);

export const sparepartsRequest = (data,navigation) => ({
    type: SPARE_PARTS,
    data,
    navigation
});
export const sparepartsSuccess = data => (
    {
        type: SPARE_PARTS_SUCCESS,
        data
    }
);
export const sparepartsFail = () => (
    {
        type: SPARE_PARTS_FAIL
    }
);

export const mechanicsRequest = () => ({
    type: MECHANICS,
});
export const mechanicsSuccess = data => (
    {
        type: MECHANICS_SUCCESS,
        data
    }
);
export const mechanicsFail = () => (
    {
        type: MECHANICS_FAIL
    }
);

export const onlineRequest = (data,cb) => ({
    type: ONLINE,
    data,
    cb
});
export const onlineSuccess = data => (
    {
        type: ONLINE_SUCCESS,
        data
    }
);
export const onlineFail = () => (
    {
        type: ONLINE_FAIL
    }
);

export const updateCategoryRequest = (data,navigation) => ({
    type: UPDATE_CATEGORY,
    data,
    navigation
});
export const updateCategorySuccess = data => (
    {
        type: UPDATE_CATEGORY_SUCCESS,
        data
    }
);
export const updateCategoryFail = () => (
    {
        type: UPDATE_CATEGORY_FAIL
    }
);