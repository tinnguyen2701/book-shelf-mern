/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import store from 'store';
import { DELETE_CART_REQUEST } from './ducks';

export default ({ cart }) => {
  const [amount, setAmount] = useState(cart.amount);

  const onDeleteItem = () => {
    store.dispatch({ type: DELETE_CART_REQUEST, payload: cart._id });
  };

  return (
    <div>
      <p>anh: {cart.poster}</p>
      <p>title: {cart.title}</p>
      <p>
        amount: {amount}
        <button type="button" onClick={() => setAmount(amount + 1)}>
          +
        </button>
        <button type="button" onClick={() => amount > 1 && setAmount(amount - 1)}>
          -
        </button>
        <button type="button" onClick={() => onDeleteItem()}>
          X
        </button>
      </p>
      <hr />
      <br />
    </div>
  );
};
