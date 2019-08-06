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
  updatePasswordSaga,
} from './components/auth/ducks';
import { sellReducer as sell, sellSaga } from './components/Sell/duck';
import { booksReducer as books, booksSaga } from './components/duck';
import {
  postReducer as post,
  postSaga,
  favoriteSaga,
  commentSaga,
  deleteCommentSaga,
  editCommentSaga,
} from './components/Post/ducks';

const rootReducer = combineReducers({
  login,
  verify,
  sell,
  books,
  post,
});

export const rootSaga = function* rootSaga() {
  yield all([
    ...registerSaga,
    ...loginSaga,
    ...currentUserSaga,
    ...verifySaga,
    ...updatePasswordSaga,
    ...sellSaga,
    ...booksSaga,
    ...postSaga,
    ...favoriteSaga,
    ...commentSaga,
    ...deleteCommentSaga,
    ...editCommentSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
