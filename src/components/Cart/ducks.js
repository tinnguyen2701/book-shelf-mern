/* eslint no-underscore-dangle: "off" */

import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const DELETE_CART_REQUEST = 'DELETE_CART_REQUEST';
export const DELETE_CART_RESPONSE = 'DELETE_CART_RESPONSE';
export const DELETE_CART_ERROR = 'DELETE_CART_ERROR';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_RESPONSE = 'ADD_ORDER_RESPONSE';
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';

export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_RESPONSE = 'DELETE_ORDER_RESPONSE';
export const DELETE_ORDER_ERROR = 'DELETE_ORDER_ERROR';

export const BUY_REQUEST = 'BUY_REQUEST';
export const BUY_RESPONSE = 'BUY_RESPONSE';
export const BUY_ERROR = 'BUY_ERROR';

export const BACK_TO_CARTS_REQUEST = 'BACK_TO_CARTS_REQUEST';
export const BACK_TO_CARTS_RESPONSE = 'BACK_TO_CARTS_RESPONSE';
export const BACK_TO_CARTS_ERROR = 'BACK_TO_CARTS_ERROR';

export const MESSAGE = 'MESSAGE';

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

/* handler state for buy item */
function* requestBuy(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}order/buy`,
      action.payload,
    );

    if (response.status === 403)
      yield put(
        createAction(MESSAGE, {
          content: `some thing went wrong with amount item: ${response.title}`,
          success: false,
        }),
      );
    if (response.status === 404)
      yield put(
        createAction(MESSAGE, { content: `not found item: ${response.title}`, success: false }),
      );
    if (response.success) {
      yield put(createAction(BUY_RESPONSE, response));
      yield put(createAction(MESSAGE, { content: 'buy success!', success: true }));
    }
  } catch (error) {
    yield put(createAction(BUY_ERROR, error));
  }
}
function* watchBuyRequest() {
  yield takeLatest(BUY_REQUEST, requestBuy);
}

export const buyActionHandler = {
  [BUY_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      order: [],
      buy: action.payload.buy,
    },
  }),
};

const initMessage = null;
const messageActionHandler = {
  [MESSAGE]: (state, action) => action.payload,
};
export const messageReducer = createReducer(initMessage, messageActionHandler);

export const buySaga = [fork(watchBuyRequest)];

/* handler state for back to carts */
function* requestBackToCarts(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}order/back`,
      action.payload,
    );
    yield put(createAction(BACK_TO_CARTS_RESPONSE, response));
  } catch (error) {
    yield put(createAction(BACK_TO_CARTS_ERROR, error));
  }
}
function* watchBackToCartsRequest() {
  yield takeLatest(BACK_TO_CARTS_REQUEST, requestBackToCarts);
}

export const backToCartsActionHandler = {
  [BACK_TO_CARTS_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      carts: action.payload.carts,
      order: action.payload.order,
    },
  }),
};

export const backToCartsSaga = [fork(watchBackToCartsRequest)];
