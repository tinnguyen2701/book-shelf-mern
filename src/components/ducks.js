import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

/* handler state for register */
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';

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
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function* requestLogin(action) {
  const { email, password, history } = action.payload;

  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/login`,
      { email, password },
    );
    console.log(response);
    yield put(createAction(LOGIN_RESPONSE, response));
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
};

export const currentUserReducer = createReducer(initLogin, loginActionHandler);
export const loginSaga = [fork(watchLoginRequest)];
