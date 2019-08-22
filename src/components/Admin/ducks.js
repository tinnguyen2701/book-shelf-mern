import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const PAYLOAD_REQUEST = 'PAYLOAD_REQUEST';
export const PAYLOAD_RESPONSE = 'PAYLOAD_RESPONSE';
export const PAYLOAD_ERROR = 'PAYLOAD_ERROR';

export const APPROVE_PAYLOAD_REQUEST = 'APPROVE_PAYLOAD_REQUEST';
export const APPROVE_PAYLOAD_RESPONSE = 'APPROVE_PAYLOAD_RESPONSE';
export const APPROVE_PAYLOAD_ERROR = 'APPROVE_PAYLOAD_ERROR';

/* handler state for get all payloads */
function* requestPayload() {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}payloads`);
    yield put(createAction(PAYLOAD_RESPONSE, response));
  } catch (error) {
    yield put(createAction(PAYLOAD_ERROR, error));
  }
}
function* watchPayloadRequest() {
  yield takeLatest(PAYLOAD_REQUEST, requestPayload);
}

const initPayload = null;
const payloadActionHandler = {
  [PAYLOAD_RESPONSE]: (state, action) => action.payload.payloads,
};

export const payloadReducer = createReducer(initPayload, payloadActionHandler);
export const payloadSaga = [fork(watchPayloadRequest)];

/* handler state for approve payload */
function* requestApprovePayload(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}payloads/approve`,
      action.payload,
    );
    yield put(createAction(PAYLOAD_RESPONSE, response));
  } catch (error) {
    yield put(createAction(PAYLOAD_ERROR, error));
  }
}
function* watchApprovePayloadRequest() {
  yield takeLatest(APPROVE_PAYLOAD_REQUEST, requestApprovePayload);
}

export const approvePayloadSaga = [fork(watchApprovePayloadRequest)];
