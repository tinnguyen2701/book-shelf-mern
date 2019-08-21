import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
export const SEARCH_ERROR = 'SEARCH_ERROR';

function* requestSearch(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}search?name=${action.payload.name}`,
    );
    yield put(createAction(SEARCH_RESPONSE, response));
  } catch (error) {
    yield put(createAction(SEARCH_ERROR, error));
  }
}
function* watchSearchRequest() {
  yield takeLatest(SEARCH_REQUEST, requestSearch);
}

const initSearch = null;
const searchActionHandler = {
  [SEARCH_RESPONSE]: (state, action) => action.payload,
};

export const searchReducer = createReducer(initSearch, searchActionHandler);
export const searchSaga = [fork(watchSearchRequest)];
