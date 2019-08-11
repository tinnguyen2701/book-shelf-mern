/* eslint no-underscore-dangle: "off" */

import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction } from 'dorothy/utils';

export const DELETE_CART_REQUEST = 'DELETE_CART_REQUEST';
export const DELETE_CART_RESPONSE = 'DELETE_CART_RESPONSE';
export const DELETE_CART_ERROR = 'DELETE_CART_ERROR';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_RESPONSE = 'ADD_ORDER_RESPONSE';
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';

export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_RESPONSE = 'DELETE_ORDER_RESPONSE';
export const DELETE_ORDER_ERROR = 'DELETE_ORDER_ERROR';

/* handler state for delete cart */
function* requestDeleteCart(action) {
  try {
    const response = yield call(callApi, 'POST', `${process.env.REACT_APP_BASE_URL}carts/delete`, {
      cartId: action.payload,
    });
    yield put(createAction(DELETE_CART_RESPONSE, response));
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

/* handler state for add order item */
function* requestAddOrder(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}order`,
      action.payload,
    );
    yield put(createAction(ADD_ORDER_RESPONSE, response));
    yield put({ type: DELETE_CART_REQUEST, payload: action.payload.cart._id });
  } catch (error) {
    yield put(createAction(ADD_ORDER_ERROR, error));
  }
}
function* watchAddOrderRequest() {
  yield takeLatest(ADD_ORDER_REQUEST, requestAddOrder);
}

export const addOrderActionHandler = {
  [ADD_ORDER_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      order: action.payload,
    },
  }),
};
export const addOrderSaga = [fork(watchAddOrderRequest)];

/* handler state for delete order item */
function* requestDeleteOrder(action) {
  try {
    const response = yield call(callApi, 'POST', `${process.env.REACT_APP_BASE_URL}order/delete/`, {
      cartId: action.payload,
    });
    yield put(createAction(DELETE_ORDER_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_ORDER_ERROR, error));
  }
}
function* watchDeleteOrderRequest() {
  yield takeLatest(DELETE_ORDER_REQUEST, requestDeleteOrder);
}

export const deleteOrderActionHandler = {
  [DELETE_ORDER_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      order: action.payload,
    },
  }),
};
export const deleteOrderSaga = [fork(watchDeleteOrderRequest)];
