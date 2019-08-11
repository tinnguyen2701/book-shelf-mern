/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import store from 'store';
import { DELETE_CART_REQUEST, ADD_ORDER_REQUEST } from './ducks';

const CartItem = ({ cart, isAuthenticate, history }) => {
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

  const onAddOrder = () => {
    if (isAuthenticate) {
      store.dispatch({ type: ADD_ORDER_REQUEST, payload: { cart, amount } });
    } else {
      history.push('/auth/login');
    }
  };

  return (
    isVisible && (
      <div>
        <p>anh: {cart.poster}</p>
        <p>title: {cart.title}</p>
        <p>money: {cart.money}</p>
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
          <button type="button" onClick={() => onAddOrder()}>
            Add
          </button>
        </p>
        <hr />
        <br />
      </div>
    )
  );
};

export default withRouter(CartItem);
