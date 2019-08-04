/* eslint-disable */

import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_RESPONSE = 'POST_RESPONSE';
export const POST_ERROR = 'POST_ERROR';

function* requestPost(action) {
  const param = action.payload.param;
  console.log(param);
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}books/${param}`);
    yield put(createAction(POST_RESPONSE, response));
  } catch (error) {
    yield put(createAction(POST_ERROR, error));
  }
}
function* watchPostRequest() {
  yield takeLatest(POST_REQUEST, requestPost);
}

const initPost = null;
const postActionHandler = {
  [POST_RESPONSE]: (state, action) => action.payload,
};

export const postReducer = createReducer(initPost, postActionHandler);
export const postSaga = [fork(watchPostRequest)];
