/* eslint no-underscore-dangle: "off" */
import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_RESPONSE = 'POST_RESPONSE';
export const POST_ERROR = 'POST_ERROR';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const FAVORITE_RESPONSE = 'FAVORITE_RESPONSE';
export const FAVORITE_ERROR = 'FAVORITE_ERROR';

export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_RESPONSE = 'COMMENT_RESPONSE';
export const COMMENT_ERROR = 'COMMENT_ERROR';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_RESPONSE = 'DELETE_COMMENT_RESPONSE';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

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
  [FAVORITE_RESPONSE]: (state, action) => {
    if (action.payload.add) {
      state.favorites.push(action.payload.userId);
    } else {
      state.favorites.pop();
    }
    return {
      ...state,
    };
  },
  [COMMENT_RESPONSE]: (state, action) => {
    state.comments.push(action.payload);
    return {
      ...state,
    };
  },
  [DELETE_COMMENT_RESPONSE]: (state, action) => {},
};

export const postReducer = createReducer(initPost, postActionHandler);
export const postSaga = [fork(watchPostRequest)];

/* handler state for like post */

function* requestFavorite(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}books/favorite/${action.payload}`,
    );
    yield put(createAction(FAVORITE_RESPONSE, response));
  } catch (error) {
    yield put(createAction(FAVORITE_ERROR, error));
  }
}
function* watchFavoriteRequest() {
  yield takeLatest(FAVORITE_REQUEST, requestFavorite);
}
export const favoriteSaga = [fork(watchFavoriteRequest)];

/* handler state for comments */
function* requestComment(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}books/comments/${action.payload.postId}`,
      { comment: action.payload.comment },
    );
    yield put(createAction(COMMENT_RESPONSE, response));
  } catch (error) {
    yield put(createAction(COMMENT_ERROR, error));
  }
}
function* watchCommentRequest() {
  yield takeLatest(COMMENT_REQUEST, requestComment);
}
export const commentSaga = [fork(watchCommentRequest)];

/* handler state for delete comments */
function* requestDeleteComment(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}books/${action.payload.postId}/comments/delete/${
        action.payload.commentId
      }`,
    );
    yield put(createAction(DELETE_COMMENT_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_COMMENT_ERROR, error));
  }
}
function* watchDeleteCommentRequest() {
  yield takeLatest(DELETE_COMMENT_REQUEST, requestDeleteComment);
}
export const deleteCommentSaga = [fork(watchDeleteCommentRequest)];
