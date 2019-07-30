import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer, logger } from 'dorothy/utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_RESPONSE = 'GET_CURRENT_USER_RESPONSE';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

/* handler state for register */
function* requestRegister(action) {
  const { email, username, password, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/register`,
      { email, username, password },
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
    yield put(createAction(LOGIN_RESPONSE, response.currentUser));
    window.localStorage.setItem('JWT', response.token);
    history.push('/');
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
  [LOGIN_ERROR]: (state, action) => {
    logger.logError(action.payload);
    return state;
  },
  [GET_CURRENT_USER_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),
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
