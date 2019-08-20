import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';
import { updatePostActionHandler } from '../Post/ducks';

export const DELETE_BUY_REQUEST = 'DELETE_BUY_REQUEST';
export const DELETE_BUY_RESPONSE = 'DELETE_BUY_RESPONSE';
export const DELETE_BUY_ERROR = 'DELETE_BUY_ERROR';

export const DELETE_SELL_REQUEST = 'DELETE_SELL_REQUEST';
export const DELETE_SELL_RESPONSE = 'DELETE_SELL_RESPONSE';
export const DELETE_SELL_ERROR = 'DELETE_SELL_ERROR';

export const EDIT_SELL_REQUEST = 'EDIT_SELL_REQUEST';
export const EDIT_SELL_RESPONSE = 'EDIT_SELL_RESPONSE';
export const EDIT_SELL_ERROR = 'EDIT_SELL_ERROR';

/* handler state for delete buy */

function* requestDeleteBuy(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/deleteBuy`,
      { id: action.payload },
    );
    yield put(createAction(DELETE_BUY_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_BUY_ERROR, error));
  }
}
function* watchDeleteBuyRequest() {
  yield takeLatest(DELETE_BUY_REQUEST, requestDeleteBuy);
}
export const deleteBuyActionHandler = {
  [DELETE_BUY_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      buy: action.payload,
    },
  }),
};
export const deleteBuySaga = [fork(watchDeleteBuyRequest)];

/* handler state for delete sell */

function* requestDeleteSell(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/deleteSell`,
      { id: action.payload },
    );
    yield put(createAction(DELETE_SELL_RESPONSE, response));
  } catch (error) {
    yield put(createAction(DELETE_SELL_ERROR, error));
  }
}
function* watchDeleteSellRequest() {
  yield takeLatest(DELETE_SELL_REQUEST, requestDeleteSell);
}
export const deleteSellActionHandler = {
  [DELETE_SELL_RESPONSE]: (state, action) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      sell: action.payload,
    },
  }),
};
export const deleteSellSaga = [fork(watchDeleteSellRequest)];

/* handler state for edit sell */
function* requestEditSell(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/editSell`,
      { id: action.payload },
    );
    if (!response) window.location.href = '/';

    yield put(createAction(EDIT_SELL_RESPONSE, response));
  } catch (error) {
    yield put(createAction(EDIT_SELL_ERROR, error));
  }
}
function* watchEditSellRequest() {
  yield takeLatest(EDIT_SELL_REQUEST, requestEditSell);
}

const initEditSell = { book: null, status: null };

const editSellActionHandler = {
  [EDIT_SELL_RESPONSE]: (state, action) => ({
    ...state,
    book: action.payload,
  }),
  ...updatePostActionHandler,
};

export const editSellReducer = createReducer(initEditSell, editSellActionHandler);
export const editSellSaga = [fork(watchEditSellRequest)];
