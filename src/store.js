import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { registerSaga, loginSaga, currentUserReducer as currentUser } from './components/ducks';

const rootReducer = combineReducers({
  currentUser,
});

export const rootSaga = function* rootSaga() {
  yield all([...registerSaga, ...loginSaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
