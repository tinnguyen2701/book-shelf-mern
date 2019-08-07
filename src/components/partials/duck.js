// import { fork, put, call, takeLatest } from 'redux-saga/effects';
// import { callApi, createAction, createReducer } from 'dorothy/utils';
// export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST'
// export const UPDATE_CART_RESPONSE = 'UPDATE_CART_REQUEST'
// export const UPDATE_CART_ERROR = 'UPDATE_CART_REQUEST'

// /* handler state for cart */
// function* requestEditComment(action) {
//   try {
//     const response = yield call(
//       callApi,
//       'POST',
//       `${process.env.REACT_APP_BASE_URL}books/${action.payload.postId}/comments/edit/${
//         action.payload.commentId
//       }`,
//       { text: action.payload.text },
//     );
//     yield put(createAction(EDIT_COMMENT_RESPONSE, response));
//   } catch (error) {
//     yield put(createAction(EDIT_COMMENT_ERROR, error));
//   }
// }
// function* watchEditCommentRequest() {
//   yield takeLatest(EDIT_COMMENT_REQUEST, requestEditComment);
// }
// export const addToCartSaga = [fork(watchEditCommentRequest)];
