/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import Image from 'utils/Image';
import { createAction } from 'dorothy/utils';
import productLocal from 'utils/productLocal';
import { UPDATE_CART_REQUEST } from '../Post/ducks';
import { UPDATE_CART } from '../duck';

const Div = styled.div`
  width: 30%;
  border: 1px solid tomato;
`;

export default ({ book, isAuthenticate, history }) => {
  const { title, description, poster, money, amount } = book;
  const bookId = book._id;

  const onAddToCardHandler = () => {
    if (isAuthenticate) {
      store.dispatch({
        type: UPDATE_CART_REQUEST,
        payload: [{ bookId, money, amount: 1, title, poster }],
      });
    } else {
      productLocal(bookId, money, 1, title, poster);
      store.dispatch(createAction(UPDATE_CART, JSON.parse(window.localStorage.getItem('carts'))));
    }
  };

  return (
    <Div>
      <div>{title}</div>
      <div>
        anh: <Image src={poster} alt={title} size={60} />
      </div>
      <div>{money}</div>
      <div>{description}</div>
      <div>{amount === 0 ? 'out of stock' : amount}</div>
      <button type="button" onClick={() => history.push(`/post/${book._id}`)}>
        More
      </button>
      <button type="button" onClick={() => onAddToCardHandler()}>
        Add to cart
      </button>
    </Div>
  );
};
