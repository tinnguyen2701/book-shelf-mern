/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import Image from 'utils/Image';
import Button from 'utils/Button';
import { createAction } from 'dorothy/utils';
import productLocal from 'utils/productLocal';
import { UPDATE_CART_REQUEST } from '../Post/ducks';
import { UPDATE_CART } from '../duck';

const Div = styled.div`
  border-radius: 5px;
  box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
  width: 22%;
  display: inline-block;
  margin: 1%;
  text-align: center;

  > div:nth-child(2) {
    overflow: hidden !important;
    height: 100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    margin: 3px;
  }

  :hover {
    position: relative;
    transform: scale(1.08);
    transition: 200ms all;
    box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
  }
`;

export default ({ book, isAuthenticate, history }) => {
  const { title, poster, money, amount } = book;
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
        <Image src={poster} alt={title} size="100%" checkHeight />
      </div>
      <div>{money}.000vnđ</div>
      <div>{amount === 0 ? 'out of stock' : <span>amount: {amount} </span>}</div>
      <Button onClick={() => history.push(`/post/${book._id}`)} value="More" />
      <Button onClick={() => onAddToCardHandler()} value="Add to cart" />
    </Div>
  );
};
