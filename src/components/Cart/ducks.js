import { fork, put, call, takeEvery, delay } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_RESPONSE = 'GET_CART_RESPONSE';
export const GET_CART_ERROR = 'GET_CART_ERROR';

function* requestCart(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}books/${action.payload}`,
    );
    yield delay(2000);
    yield put(createAction(GET_CART_RESPONSE, response));
  } catch (error) {
    yield put(createAction(GET_CART_ERROR, error));
  }
}
function* watchGetCartRequest() {
  yield takeEvery(GET_CART_REQUEST, requestCart);
}

const initBook = null;
const cartActionHandler = {
  [GET_CART_RESPONSE]: null,
  [GET_CART_RESPONSE]: (state, action) => {
    console.log(action.payload);
    return action.payload;
  },
};

export const cartReducer = createReducer(initBook, cartActionHandler);
export const getCartSaga = [fork(watchGetCartRequest)];
