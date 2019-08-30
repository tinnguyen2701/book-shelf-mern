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
  editUserSaga,
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
  addToCartSaga,
  updatePostSaga,
} from './components/Post/ducks';
import {
  deleteCartSaga,
  addOrderSaga,
  deleteOrderSaga,
  buySaga,
  messageReducer as message,
} from './components/Cart/ducks';
import {
  deleteBuySaga,
  deleteSellSaga,
  editSellSaga,
  editSellReducer as editSell,
  removeAccountSaga,
} from './components/User/ducks';
import { searchSaga, searchReducer as search } from './components/Search/duck';
import {
  payloadSaga,
  payloadReducer as payloads,
  approvePayloadSaga,
  rejectPayloadSaga,
} from './components/Admin/ducks';
import {
  anotherShelfSaga,
  anotherShelfReducer as anotherShelf,
} from './components/AnotherShelf/ducks';

const rootReducer = combineReducers({
  login,
  verify,
  sell,
  books,
  post,
  message,
  editSell,
  search,
  payloads,
  anotherShelf,
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
    ...addToCartSaga,
    ...deleteCartSaga,
    ...addOrderSaga,
    ...deleteOrderSaga,
    ...buySaga,
    ...editUserSaga,
    ...deleteBuySaga,
    ...deleteSellSaga,
    ...editSellSaga,
    ...updatePostSaga,
    ...searchSaga,
    ...removeAccountSaga,
    ...payloadSaga,
    ...approvePayloadSaga,
    ...rejectPayloadSaga,
    ...anotherShelfSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
