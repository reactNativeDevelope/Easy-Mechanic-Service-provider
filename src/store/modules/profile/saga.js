import { takeEvery, put, call } from 'redux-saga/effects';
import {
     EDIT_PROFILE,
     EDIT_PROFILE_PIC,
     CHANGE_PASSWORD,
     DELETE_ACCOUNT,
     PROFILE
} from './types';
import {
   editProfilePicFail,
   editProfilePicSuccess,
   editProfileSuccess,
   editProfileFail,
   changePAsswordSuccess,
   chnagePasswordFail,
   deleteAccountSuccess,
   deleteAccountFail,
   profileSuccess,
   profileFail
} from './action';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast
} from '../../../utils';
import {profilerequest} from '../profile/action';

function* onEditPicRequested({ data,cb }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.updateProfilePic,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield put(editProfilePicSuccess(response.data));
      yield* hideLoader(false, '');
      cb(response.data);
      yield  put(profilerequest());
      successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(editProfilePicFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(editProfilePicFail());
  }
}

function* onEditProfileRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.editProfile,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(editProfileSuccess(response.data));
      yield  put(profilerequest());
      successToast(response.message);
      navigation.goBack();
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(editProfileFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(editProfileFail());
  }
}

function* onChangePasswordRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.changePassword,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(changePAsswordSuccess(response.data));
      successToast(response.message);
        navigation.goBack();
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(chnagePasswordFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(chnagePasswordFail());
  }
}

function* onDeleteAccountRequested() {
  yield* showLoader(false);
  try {
    const response = yield Request.deleteRequest(
      apiConfig.deleteAccount
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(deleteAccountSuccess(response.data));
      successToast(response.message);
      yield  put(loginSuccess());
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(deleteAccountFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(deleteAccountFail());
  }
}


function* onGetProfileRequested() {
  //yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.getProfile
    );
    console.log(' profile response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(profileSuccess(response.data));
      //successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(profileFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(profileFail());
  }
}



function* sagaLogin() {
  yield takeEvery(EDIT_PROFILE_PIC, onEditPicRequested);
  yield takeEvery(EDIT_PROFILE, onEditProfileRequested);
  yield takeEvery(CHANGE_PASSWORD, onChangePasswordRequested);
  yield takeEvery(DELETE_ACCOUNT, onDeleteAccountRequested);
  yield takeEvery(PROFILE, onGetProfileRequested);

}
export default sagaLogin;
