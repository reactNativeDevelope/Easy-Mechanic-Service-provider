import axios from 'axios'
import config from "../config";
import { dispatch, getStore } from '../store'
import { apiFailure, errorToast } from '../utils';
import * as RootNavigation from '../navigation/RootNavigation';
import { logoutRequest } from '../store/modules/login/actions';
const navigation = RootNavigation;

// Create Instance
const AxiosInstance = axios.create({
    baseURL: config.API_URL,
    timeout: 20000,
    transformRequest: [function (data, headers) {
        let { loginData } = getStore().getState().loginReducer
        if (loginData && loginData.token) {
            headers['token'] = loginData.token
        }
        if (data && data._parts) {
            return data
        } else {
            return JSON.stringify(data)
        }
    }],
    headers: { 'Content-Type': 'application/json', }
})

// Response Interceptor
AxiosInstance.interceptors.response.use((response) => {
    if (response?.data?.error_code === 5004) {
        errorToast(response.data.data?.message)
        dispatch(logoutRequest(navigation));
        return response;
    } else {
        return response;
    }
}, (error) => {
    console.log('ERROR CONFIG', error.message)
    if (!error.response) {
        return Promise.reject({
            status: apiFailure,
            message: 'Please check your internet connection'
        })
    } else {
        return error.response
    }

})

export default AxiosInstance