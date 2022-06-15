import { combineReducers } from 'redux'
import loadingReducer from '../components/customLoader/reducer';
import loginReducer from "./modules/login/reducer";
import profileReducer from "./modules/profile/reducer";
import categoriesReducer from "./modules/categories/reducer";

import storage from '@react-native-async-storage/async-storage';

export const logoutRequest = () => ({
  type: 'LOG_OUT',
});

const appReducer = combineReducers({
  loadingReducer,
  loginReducer,
  profileReducer,
  categoriesReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUESTED') {
    let fcmToken;
    Object.keys(state).forEach(key => {
      if (key == 'loginReducer') {
        fcmToken = state[key].fcmToken;
      }
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign(
      {},
      {
        ...initialState,
        loginReducer: { ...initialState.loginReducer, fcmToken: fcmToken },
      },
    );
  }
  return appReducer(state, action);
};

export default rootReducer;
