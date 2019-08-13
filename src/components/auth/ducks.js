import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';
import { addToCartActionHandler, UPDATE_CART_REQUEST } from '../Post/ducks';
import {
  deleteCartActionHandler,
  addOrderActionHandler,
  deleteOrderActionHandler,
  buyActionHandler,
} from '../Cart/ducks';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_RESPONSE = 'GET_CURRENT_USER_RESPONSE';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_RESPONSE = 'VERIFY_RESPONSE';
export const VERIFY_ERROR = 'VERIFY_ERROR';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_RESPONSE = 'EDIT_USER_RESPONSE';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const SIGN_OUT = 'SIGN_OUT';

/* handler state for register */
function* requestRegister(action) {
  const { email, username, password, avatar, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/register`,
      { email, username, password, avatar },
    );
    if (response.success) history.push('/auth/login');
  } catch (error) {
    yield put(createAction(REGISTER_ERROR, error));
  }
}
function* watchRegisterRequest() {
  yield takeLatest(REGISTER_REQUEST, requestRegister);
}

export const registerSaga = [fork(watchRegisterRequest)];

/* handler state for login */
function* requestLogin(action) {
  const { email, password, history } = action.payload;

  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/login`,
      { email, password },
    );
    if (response.success) {
      yield put(createAction(LOGIN_RESPONSE, response.currentUser));
      window.localStorage.setItem('JWT', response.token);
      if (window.localStorage.getItem('carts')) {
        yield put({
          type: UPDATE_CART_REQUEST,
          payload: JSON.parse(window.localStorage.getItem('carts')),
        });
        window.localStorage.removeItem('carts');
      }
      history.push('/');
    }
  } catch (error) {
    yield put(createAction(LOGIN_ERROR, error));
  }
}
function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
}

const initLogin = { isAuthenticate: false, currentUser: null };
const loginActionHandler = {
  [LOGIN_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),
  [LOGIN_ERROR]: state => {
    return {
      ...state,
      currentUser: false,
    };
  },
  [GET_CURRENT_USER_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),
  [SIGN_OUT]: state => ({
    ...state,
    isAuthenticate: false,
    currentUser: null,
  }),
  ...addToCartActionHandler,
  ...deleteCartActionHandler,
  ...addOrderActionHandler,
  ...deleteOrderActionHandler,
  ...buyActionHandler,
};

export const loginReducer = createReducer(initLogin, loginActionHandler);
export const loginSaga = [fork(watchLoginRequest)];

/* handler state for get current user */
function* requestCurrentUser(action) {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}api/auth`, {
      token: action.payload,
    });
    yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
  } catch (error) {
    yield put(createAction(GET_CURRENT_USER_ERROR, error));
  }
}
function* watchCurrentUserRequest() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, requestCurrentUser);
}
export const currentUserSaga = [fork(watchCurrentUserRequest)];

/* handler state for verify email */
function* requestVerify(action) {
  const { email, code, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/verify`,
      { email, code },
    );
    if (response.success) {
      if (code) {
        window.localStorage.setItem('JWT', response.token);
        history.push('/auth/rememberPassword');
      } else yield put(createAction(VERIFY_RESPONSE, email));
    }
  } catch (error) {
    yield put(createAction(VERIFY_ERROR, error));
  }
}
function* watchVerifyRequest() {
  yield takeLatest(VERIFY_REQUEST, requestVerify);
}

const initVerify = { isVisible: false, isCheckInfoEmail: null };
const verifyActionHandler = {
  [VERIFY_RESPONSE]: state => ({
    ...state,
    isVisible: true,
    isCheckInfo: true,
  }),
  [VERIFY_ERROR]: state => ({
    ...state,
    isCheckInfo: false,
  }),
};

export const verifyReducer = createReducer(initVerify, verifyActionHandler);
export const verifySaga = [fork(watchVerifyRequest)];

/* handler state for update password */
function* requestUpdatePassword(action) {
  const { password, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/updatePassword`,
      { password, token: window.localStorage.getItem('JWT') },
    );
    if (response.success) history.push('/auth/login');
  } catch (error) {
    yield put(createAction(UPDATE_PASSWORD_ERROR, error));
  }
}
function* watchUpdatePasswordRequest() {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, requestUpdatePassword);
}
export const updatePasswordSaga = [fork(watchUpdatePasswordRequest)];

/* handler state for update user */
function* requestEditUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/editUser`,
      action.payload,
    );
    yield put(createAction(EDIT_USER_RESPONSE, response));
  } catch (error) {
    yield put(createAction(EDIT_USER_ERROR, error));
  }
}
function* watchEditUserRequest() {
  yield takeLatest(EDIT_USER_REQUEST, requestEditUser);
}
export const editUserSaga = [fork(watchEditUserRequest)];
