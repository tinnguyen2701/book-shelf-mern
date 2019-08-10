/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import store from 'store';
import { DELETE_CART_REQUEST } from './ducks';

export default ({ cart, isAuthenticate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [amount, setAmount] = useState(cart.amount);

  const onDeleteItem = () => {
    if (isAuthenticate) {
      store.dispatch({ type: DELETE_CART_REQUEST, payload: cart._id });
    } else if (window.localStorage.getItem('carts')) {
      const carts = JSON.parse(window.localStorage.getItem('carts')).filter(
        item => item.bookId !== cart.bookId,
      );
      window.localStorage.setItem('carts', JSON.stringify(carts));
      setIsVisible(false);
    }
  };

  return (
    isVisible && (
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
          <button type="button">Add</button>
        </p>
        <hr />
        <br />
      </div>
    )
  );
};
