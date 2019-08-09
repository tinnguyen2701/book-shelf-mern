/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

const Cart = ({ currentUser }) => (
  <div>
    <p>my carts</p>
    {currentUser && currentUser.carts.map(cart => <CartItem key={cart._id} cart={cart} />)}
  </div>
);

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Cart);
