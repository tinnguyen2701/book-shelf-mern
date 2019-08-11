/* eslint no-underscore-dangle: "off" */
import React from 'react';
import store from 'store';
import { DELETE_ORDER_REQUEST } from './ducks';

export default ({ item }) => {
  const { title, amount, money, poster } = item;

  const onDeleteOrder = () => {
    store.dispatch({ type: DELETE_ORDER_REQUEST, payload: item._id });
  };

  return (
    <div>
      <p>anh: {poster}</p>
      <p>title: {title}</p>
      <p>money: {money}</p>
      <p>amount: {amount}</p>
      <button type="button" onClick={() => onDeleteOrder()}>
        X
      </button>
      <hr />
      <br />
    </div>
  );
};