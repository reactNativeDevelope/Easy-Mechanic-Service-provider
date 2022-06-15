import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN,
  REGISTER ,
  FORGOT_PASSWORD,
  LOGOUT_REQUESTED,
  RESET_PASSWORD,
  VERIFY_OTP,
  RESEND_OTP,
  TERMS_CONDITIONS
} from './types';
import {
  registerSuccess,
  registerFail,
  loginFail,
  loginSuccess,
  forgotPasswordSuccess,
  forgotPasswordFail,
  logoutSuccess,
  logoutFail,
  resetPasswordSuccess,
  resetPasswordFail,
  verifyOtpSuccess,
  verifyOtpFail,
  resendOtpSuccess,
  resendOtpFail,
  termsConditionsSuccess,
  termsConditionsFail

} from './actions';
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

function* onLoginRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.login,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield put(loginSuccess(response));
      yield put(profilerequest());
      yield* hideLoader(false, '');
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(loginFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(loginFail());
  }
}

function* onRegisterRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.register,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(registerSuccess(response.data));
        navigation.navigate(screenName.thanks,{screenType:'register'})
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(registerFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(registerFail());
  }
}

function* onForgotPasswordRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.forgotPassword,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(forgotPasswordSuccess(response.data));
        navigation.navigate(screenName.verifyOtp,{ screenType: 'forgot',data:data })
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(forgotPasswordFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(forgotPasswordFail());
  }
}

function* onLogoutRequested({ navigation }) {
  yield* showLoader(false);
  console.log('dsdd');
  try {
    yield put(loginSuccess(null));
    yield put(logoutSuccess(null));
    yield* hideLoader(false, '');
  } catch (error) {
    yield put(logoutFail());
    yield* hideLoader(false, '');
    showToast(error.message, 'danger');

  }
}

function* onResetPasswordRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.resetPassword,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(resetPasswordSuccess(response.data));
        navigation.navigate(screenName.thanks,{screenType:'reset'})
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(resetPasswordFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(resetPasswordFail());
  }
}

function* onVerifyOtpRequested({ data,screenType,cb ,navigation }) {
  yield* showLoader(false);
  console.log('data', screenType)
  try {
    const response = yield Request.post(
      apiConfig.verifyOtp,
      data
    );
    if (response.status == 'succes') {
      yield* hideLoader(false, '');
      console.log('response---response', response)
         cb(response);
      //yield put(verifyOtpSuccess(response.data));
        //navigation.navigate(screenName.resetPassword,{data});
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(verifyOtpFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(verifyOtpFail());
  }
}
function* resendOtpRequested({ data,cb }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.resendOtp,
      data
    );
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(resendOtpSuccess(response.data));
      cb(response.data);
      successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(resendOtpFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(resendOtpFail());
  }
}

function* termsConditionsRequested({cb}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.termsCondition);
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(termsConditionsSuccess(response.data));
      cb(response.data);
      successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(termsConditionsFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(termsConditionsFail());
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN, onLoginRequested);
  yield takeEvery(REGISTER, onRegisterRequested);
  yield takeEvery(FORGOT_PASSWORD, onForgotPasswordRequested);
  yield takeEvery(LOGOUT_REQUESTED, onLogoutRequested);
  yield takeEvery(RESET_PASSWORD, onResetPasswordRequested);
  yield takeEvery(VERIFY_OTP, onVerifyOtpRequested);
  yield takeEvery(RESEND_OTP, resendOtpRequested);
  yield takeEvery(TERMS_CONDITIONS, termsConditionsRequested);


}
export default sagaLogin;
