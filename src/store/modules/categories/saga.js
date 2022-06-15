import { takeEvery, put, call } from 'redux-saga/effects';
import {
     CATEGORIES,
     MECHANICS,
     SPARE_PARTS,
     SUPPLIERS,
     ONLINE,
     UPDATE_CATEGORY
} from './types';
import {
      categoriesSuccess,
      categoriesFail,
      sparepartsSuccess,
      sparepartsFail,
      supplierSuccess,
      supplierFail,
      onlineSuccess,
      onlineFail,
      updateCategorySuccess,
      updateCategoryFail
} from './actions';
import {profilerequest} from '../../modules/profile/action';
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


function* onGetCategoriesRequested({cb}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.categories);
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(categoriesSuccess(response.data));
      cb(response.data);
      //successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(categoriesFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(categoriesFail());
  }
}

function* onGetSuppliersRequested({data,navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.suppliers+data._id);
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(supplierSuccess(response.data));
      if(data.type ==='SPARE_PARTS'){
       navigation.navigate(screenName.supplier);
      }else{
        navigation.navigate(screenName.mechanics);

      }
      //successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(supplierFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(supplierFail());
  }
}

function* onGetSparePartRequested({data,navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.spareParts+data._id);
    console.log('response---', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(sparepartsSuccess(response.data));
      navigation.navigate(screenName.sparePart,{data})
      //successToast(response.message);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(sparepartsFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sparepartsFail());
  }
}


function* onOffLineRequested({data,cb}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiConfig.onlineOffline,data);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(onlineSuccess(response.data));
      yield put(profilerequest());
      cb(response.data)
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(onlineFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(onlineFail());
  }
}

function* onUpdateCategoryRequested({data,navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiConfig.updateCategories,data);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(updateCategorySuccess(response.data));
      yield put(profilerequest());
      navigation.navigate(screenName.home);
    } else {
      errorToast(response.message)
      yield* hideLoader(false, '');
      yield put(updateCategoryFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(updateCategoryFail());
  }
}



function* sagaLogin() {
  yield takeEvery(CATEGORIES, onGetCategoriesRequested);
  yield takeEvery(SUPPLIERS, onGetSuppliersRequested);
  yield takeEvery(SPARE_PARTS, onGetSparePartRequested);
  yield takeEvery(ONLINE, onOffLineRequested);
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategoryRequested);


}
export default sagaLogin;
