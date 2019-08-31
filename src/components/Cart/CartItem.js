/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Button from 'utils/Button';
import store from 'store';
import { createAction } from 'dorothy/utils';
import Image from 'utils/Image';
import { DELETE_CART_REQUEST, ADD_ORDER_REQUEST, MESSAGE } from './ducks';

const Div = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px 0px;
    box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    img {
      width: inherit;
    }

    :hover {
      position: relative;
      transform: scale(1.08);
      transition: 200ms all;
      box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
    }
  }

  button {
    margin-right: 5px;
  }

  p:nth-child(3) button {
    margin-left: 5px;
  }
`;

const WrapperImage = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const CartItem = ({ cart, isAuthenticate, history }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [amount, setAmount] = useState(cart.amount);

  const onDeleteItem = () => {
    if (isAuthenticate) {
      store.dispatch(createAction(MESSAGE, null));
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
      store.dispatch(createAction(MESSAGE, null));
      store.dispatch({ type: ADD_ORDER_REQUEST, payload: { cart, amount } });
    } else {
      history.push('/auth/login');
    }
  };

  return (
    isVisible && (
      <Div>
        <WrapperImage onClick={() => history.push(`/post/${cart.bookId}`)}>
          <Image src={cart.poster} alt={cart.title} size="100%" checkHeight />
        </WrapperImage>
        <div>
          <p>title: {cart.title}</p>
          <p>money: {cart.money}.000vnđ</p>
          <p>
            amount:
            <Button type="button" onClick={() => setAmount(amount + 1)} value="+" />
            {amount}
            <Button type="button" onClick={() => amount > 1 && setAmount(amount - 1)} value="-" />
          </p>
          <p>
            <Button type="button" onClick={() => onAddOrder()} value="Add" />
            <Button type="button" onClick={() => onDeleteItem()} value="X" />
          </p>
        </div>
      </Div>
    )
  );
};

export default withRouter(CartItem);
