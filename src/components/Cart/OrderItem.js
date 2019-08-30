/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import Button from 'utils/Button';
import Image from 'utils/Image';
import { DELETE_ORDER_REQUEST } from './ducks';

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
  }
`;

export default ({ item }) => {
  const { title, amount, money, poster } = item;

  const onDeleteOrder = () => {
    store.dispatch({ type: DELETE_ORDER_REQUEST, payload: item._id });
  };

  return (
    <Div>
      <div>
        <Image src={poster} alt={title} size="100%" />
      </div>
      <div>
        <p>title: {title}</p>
        <p>money: {money}.000vnđ</p>
        <p>amount: {amount}</p>
        <Button type="button" onClick={() => onDeleteOrder()} value="X" />
      </div>
    </Div>
  );
};
