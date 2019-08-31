/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import Button from 'utils/Button';
import Image from 'utils/Image';
import { withRouter } from 'react-router-dom';
import { DELETE_ORDER_REQUEST, BACK_TO_CARTS_REQUEST } from './ducks';

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

  button {
    margin-right: 5px;
  }
`;

const WrapperImage = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const OrderItem = ({ item, history }) => {
  const { title, amount, money, poster } = item;

  const onDeleteOrder = () => {
    store.dispatch({ type: DELETE_ORDER_REQUEST, payload: item._id });
  };

  const backToCarts = () => {
    store.dispatch({ type: BACK_TO_CARTS_REQUEST, payload: item });
  };

  return (
    <Div>
      <WrapperImage onClick={() => history.push(`/post/${item.bookId}`)}>
        <Image src={poster} alt={title} size="100%" />
      </WrapperImage>
      <div>
        <p>title: {title}</p>
        <p>money: {money}.000vnđ</p>
        <p>amount: {amount}</p>
        <Button onClick={() => onDeleteOrder()} value="X" />
        <Button value="back to your carts" onClick={() => backToCarts()} />
      </div>
    </Div>
  );
};
export default withRouter(OrderItem);
