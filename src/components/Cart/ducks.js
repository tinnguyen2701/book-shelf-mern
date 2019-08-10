import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction } from 'dorothy/utils';

export const DELETE_CART_REQUEST = 'DELETE_CART_REQUEST';
export const DELETE_CART_RESPONSE = 'DELETE_CART_RESPONSE';
export const DELETE_CART_ERROR = 'DELETE_CART_ERROR';

function* requestDeleteCart(action) {
  try {
    const response = yield call(callApi, 'POST', `${process.env.REACT_APP_BASE_URL}carts/delete`, {
      cartId: action.payload,
    });
    console.log(response);
    // yield put(createAction(DELETE_CART_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_CART_ERROR, error));
  }
}
function* watchDeleteCartRequest() {
  yield takeLatest(DELETE_CART_REQUEST, requestDeleteCart);
}
export const deleteCartActionHandler = {
  [DELETE_CART_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      carts: action.payload,
    },
  }),
};
export const deleteCartSaga = [fork(watchDeleteCartRequest)];
