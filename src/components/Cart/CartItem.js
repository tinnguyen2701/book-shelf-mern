/* eslint no-underscore-dangle: "off" */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { GET_CART_REQUEST } from './ducks';

const CartItem = ({ cart, book }) => {
  useEffect(() => {
    console.log('t d t');
    store.dispatch({ type: GET_CART_REQUEST, payload: cart.bookId });
  }, []);

  return (
    <div>
      <p>anh: {book && book.poster}</p>
      <p>title: {book && book.title}</p>
      <p>amount: {cart.amount}</p>
      <hr />
      <br />
    </div>
  );
};

export default connect(state => ({
  book: state.cart,
}))(CartItem);
