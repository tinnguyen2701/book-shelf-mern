import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_RESPONSE = 'BOOKS_RESPONSE';
export const BOOKS_ERROR = 'BOOKS_ERROR';

function* requestBooks() {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}books`);
    yield put(createAction(BOOKS_RESPONSE, response));
  } catch (error) {
    yield put(createAction(BOOKS_ERROR, error));
  }
}
function* watchBooksRequest() {
  yield takeLatest(BOOKS_REQUEST, requestBooks);
}

const initBooks = [];
const booksActionHandler = {
  [BOOKS_RESPONSE]: (state, action) => action.payload,
};
export const booksReducer = createReducer(initBooks, booksActionHandler);
export const booksSaga = [fork(watchBooksRequest)];
