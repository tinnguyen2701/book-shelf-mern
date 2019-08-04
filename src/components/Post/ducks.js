import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_RESPONSE = 'POST_RESPONSE';
export const POST_ERROR = 'POST_ERROR';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const FAVORITE_RESPONSE = 'FAVORITE_RESPONSE';
export const FAVORITE_ERROR = 'FAVORITE_ERROR';

/* handler state for get post */
function* requestPost(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}books/${action.payload}`,
    );
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

/* handler state for like post */

function* requestFavorite(action) {
  try {
    yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}books/favorite/${action.payload}`,
    );
  } catch (error) {
    yield put(createAction(FAVORITE_ERROR, error));
  }
}
function* watchFavoriteRequest() {
  yield takeLatest(FAVORITE_REQUEST, requestFavorite);
}
export const favoriteSaga = [fork(watchFavoriteRequest)];
