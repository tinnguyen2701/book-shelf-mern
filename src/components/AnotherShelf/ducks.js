import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const ANOTHER_SHELF_REQUEST = 'ANOTHER_SHELF_REQUEST';
export const ANOTHER_SHELF_RESPONSE = 'ANOTHER_SHELF_RESPONSE';
export const ANOTHER_SHELF_ERROR = 'ANOTHER_SHELF_ERROR';

function* requestAnotherShelf(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}anotherShelf/${action.payload}`,
    );
    yield put(createAction(ANOTHER_SHELF_RESPONSE, response));
  } catch (error) {
    yield put(createAction(ANOTHER_SHELF_ERROR, error));
  }
}
function* watchAnotherShelfRequest() {
  yield takeLatest(ANOTHER_SHELF_REQUEST, requestAnotherShelf);
}

const initAnotherShelf = null;
const anotherShelfActionHandler = {
  [ANOTHER_SHELF_RESPONSE]: (state, action) => action.payload,
};

export const anotherShelfReducer = createReducer(initAnotherShelf, anotherShelfActionHandler);
export const anotherShelfSaga = [fork(watchAnotherShelfRequest)];
