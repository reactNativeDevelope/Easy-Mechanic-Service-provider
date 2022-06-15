import {put} from 'redux-saga/effects';
import {hideLoading, showLoading} from '../../components/customLoader/action';
import { showMessage } from 'react-native-flash-message';

export function* hideLoader(isError, errorMessage) {
  yield put(hideLoading(isError, errorMessage));
}

export function* showLoader(silentFetch) {
  if (!silentFetch) {
    yield put(showLoading());
  }
}

export const errorToast = (description, msg, position) => {
  showMessage({
      message: msg ? msg : 'Error',
      description: description ? description : 'Oops! something went wrong',
      type: 'danger',
      position: position ? position : 'bottom',
      icon: 'auto',
  });
};

export const successToast = (description, msg, position) => {
  showMessage({
      message: msg ? msg : 'Success',
      description: description ? description : '',
      type: 'success',
      position: position ? position : 'bottom',
      icon: 'auto',
  });
};

export const isEmpty=(obj)=> {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}