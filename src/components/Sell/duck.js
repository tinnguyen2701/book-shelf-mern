import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const SELL_REQUEST = 'SELL_REQUEST';
export const SELL_RESPONSE = 'SELL_RESPONSE';
export const SELL_ERROR = 'SELL_ERROR';

function* requestSell(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}sell`,
      action.payload,
    );

    yield put(createAction(SELL_RESPONSE, response));
  } catch (error) {
    yield put(createAction(SELL_ERROR, error));
  }
}
function* watchSellRequest() {
  yield takeLatest(SELL_REQUEST, requestSell);
}

const initSell = null;
const sellActionHandler = {
  [SELL_RESPONSE]: (state, action) => action.payload,
  [SELL_ERROR]: false,
};

export const sellReducer = createReducer(initSell, sellActionHandler);
export const sellSaga = [fork(watchSellRequest)];
