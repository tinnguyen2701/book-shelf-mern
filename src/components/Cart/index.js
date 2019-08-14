/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import OrderItem from './OrderItem';
import { BUY_REQUEST } from './ducks';

const Cart = ({ currentUser, message, dispatch }) => {
  const onClickHandler = () => {
    dispatch({ type: BUY_REQUEST, payload: { order: currentUser.order } });
  };

  return (
    <div>
      <p>my carts</p>
      {currentUser &&
        currentUser.carts.map(cart => <CartItem key={cart._id} cart={cart} isAuthenticate />)}

      {window.localStorage.getItem('carts') &&
        JSON.parse(window.localStorage.getItem('carts')).map(cart => (
          <CartItem key={cart.title} cart={cart} isAuthenticate={false} />
        ))}

      <div>
        <p>Order</p>

        {currentUser &&
          currentUser.order.map((item, index) => <OrderItem key={index.toString()} item={item} />)}
        {currentUser && currentUser.order.length > 0 && (
          <button type="button" onClick={() => onClickHandler()}>
            Buy
          </button>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser,
  message: state.message,
}))(Cart);
