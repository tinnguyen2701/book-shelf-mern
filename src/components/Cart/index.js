/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import OrderItem from './OrderItem';

const Cart = ({ currentUser }) => (
  <div>
    <p>my carts</p>
    {currentUser &&
      currentUser.carts.map(cart => <CartItem key={cart._id} cart={cart} isAuthenticate />)}

    {window.localStorage.getItem('carts') &&
      JSON.parse(window.localStorage.getItem('carts')).map(cart => (
        <CartItem key={cart.title} cart={cart} isAuthenticate={false} />
      ))}

    <div>Order</div>
    {currentUser &&
      currentUser.order.map((item, index) => <OrderItem key={index.toString()} item={item} />)}
  </div>
);

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Cart);
