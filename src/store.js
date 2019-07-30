import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import {
  registerSaga,
  loginSaga,
  loginReducer as login,
  currentUserSaga,
  verifyReducer as verify,
  verifySaga,
} from './components/ducks';

const rootReducer = combineReducers({
  login,
  verify,
});

export const rootSaga = function* rootSaga() {
  yield all([...registerSaga, ...loginSaga, ...currentUserSaga, ...verifySaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
