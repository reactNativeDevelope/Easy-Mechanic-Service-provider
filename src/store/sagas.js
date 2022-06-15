import { all } from 'redux-saga/effects';
import sagaLogin from './modules/login/saga';
import sagaProfile from './modules/profile/saga';
import sagaCategories from './modules/categories/saga';

export default function* rootSaga() {
  yield all([
    sagaLogin(),
   sagaProfile(),
   sagaCategories()

  ]);
}


