/* eslint no-underscore-dangle: 'off' */
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import { withRouter } from 'react-router-dom';
import Image from 'utils/Image';
import Button from 'utils/Button';
import { DELETE_SELL_REQUEST, DELETE_BUY_REQUEST } from './ducks';

const Div = styled.div`
  > div {
    margin: 15px 0;
    display: flex;
    > div:first-child {
      border-radius: 5px;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100px;
      height: 100px;
      overflow: hidden;
      box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
      margin-right: 10px;
    }

    > div:first-child:hover {
      box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
    }

    > div:last-child {
      button {
        margin-right: 10px;
      }
    }
  }
`;

const WrapperImage = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Shelf = ({ currentUser, history }) => {
  const onDeleteBoughtHandler = id => {
    store.dispatch({ type: DELETE_BUY_REQUEST, payload: id });
  };

  const onDeleteSelltHandler = id => {
    store.dispatch({ type: DELETE_SELL_REQUEST, payload: id });
  };

  const onEditSelltHandler = id => {
    history.push(`/post/edit/${id}`);
  };

  return (
    <div>
      <Div>
        B O U G H T
        {currentUser.buy.map((item, index) => (
          <div key={index.toString()}>
            <WrapperImage onClick={() => history.push(`/post/${item.bookId}`)}>
              <Image src={item.poster} alt={item.title} size="100%" />
            </WrapperImage>
            <div>
              <p>title: {item.title}</p>
              <p>amount: {item.amount}</p>
              <p>money: {item.money}</p>
              <p>
                <Button onClick={() => onDeleteBoughtHandler(item._id)} value="Delete" />
              </p>
            </div>
          </div>
        ))}
      </Div>
      <Div>
        S O L D
        {currentUser.sell.map((item, index) => (
          <div key={index.toString()}>
            <WrapperImage onClick={() => history.push(`/post/${item._id}`)}>
              <Image src={item.poster} alt={item.title} size="100%" />
            </WrapperImage>
            <div>
              <p>title: {item.title}</p>
              <p>amount: {item.amount + item.bought}</p>
              <p>sold: {item.bought}</p>
              <p>money: {item.money}.000vnđ</p>
              <p>
                <Button onClick={() => onDeleteSelltHandler(item._id)} value="Delete" />
                <Button onClick={() => onEditSelltHandler(item._id)} value="Edit" />
              </p>
            </div>
          </div>
        ))}
      </Div>
    </div>
  );
};

export default withRouter(Shelf);
