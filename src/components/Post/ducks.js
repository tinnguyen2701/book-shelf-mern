/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "error" */
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

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_RESPONSE = 'EDIT_COMMENT_RESPONSE';
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_RESPONSE = 'UPDATE_CART_RESPONSE';
export const UPDATE_CART_ERROR = 'UPDATE_CART_ERROR';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_RESPONSE = 'UPDATE_POST_RESPONSE';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';

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
  [DELETE_COMMENT_RESPONSE]: (state, action) => {
    const comments = state.comments.filter(comment => comment._id !== action.payload);
    return {
      ...state,
      comments,
    };
  },
  [EDIT_COMMENT_RESPONSE]: (state, action) => {
    const comments = state.comments.filter(comment => {
      if (comment._id === action.payload.commentId) comment.body = action.payload.text;
      return comment;
    });
    return {
      ...state,
      comments,
    };
  },
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

/* handler state for edit comments */
function* requestEditComment(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}books/${action.payload.postId}/comments/edit/${
        action.payload.commentId
      }`,
      { text: action.payload.text },
    );
    yield put(createAction(EDIT_COMMENT_RESPONSE, response));
  } catch (error) {
    yield put(createAction(EDIT_COMMENT_ERROR, error));
  }
}
function* watchEditCommentRequest() {
  yield takeLatest(EDIT_COMMENT_REQUEST, requestEditComment);
}
export const editCommentSaga = [fork(watchEditCommentRequest)];

/* handler state for cart */
function* requestUpdateCart(action) {
  try {
    const response = yield call(callApi, 'POST', `${process.env.REACT_APP_BASE_URL}carts`, {
      carts: action.payload,
    });
    yield put(createAction(UPDATE_CART_RESPONSE, response));
  } catch (error) {
    yield put(createAction(UPDATE_CART_ERROR, error));
  }
}
function* watchAddToCartRequest() {
  yield takeLatest(UPDATE_CART_REQUEST, requestUpdateCart);
}

export const addToCartActionHandler = {
  [UPDATE_CART_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      carts: action.payload,
    },
  }),
};
export const addToCartSaga = [fork(watchAddToCartRequest)];

/* handler state for update post */
function* requestUpdatePost(action) {
  console.log(action.payload);

  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}sell/update`,
      action.payload,
    );
    if (response.success) {
      yield put(createAction(UPDATE_POST_RESPONSE, response.success));
    }
  } catch (error) {
    yield put(createAction(UPDATE_POST_ERROR, error));
  }
}
function* watchUpdatePostRequest() {
  yield takeLatest(UPDATE_POST_REQUEST, requestUpdatePost);
}

export const updatePostActionHandler = {
  [UPDATE_POST_RESPONSE]: state => ({
    ...state,
    status: 'Update post success !',
  }),
  [UPDATE_POST_REQUEST]: state => ({
    ...state,
    status: '',
  }),
  [UPDATE_POST_ERROR]: state => ({
    ...state,
    status: 'Update post went wrong !',
  }),
};
export const updatePostSaga = [fork(watchUpdatePostRequest)];
