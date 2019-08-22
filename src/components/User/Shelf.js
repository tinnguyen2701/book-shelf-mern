/* eslint no-underscore-dangle: 'off' */
import React from 'react';
import store from 'store';
import { withRouter } from 'react-router-dom';
import { DELETE_SELL_REQUEST, DELETE_BUY_REQUEST } from './ducks';

const Shelf = ({ currentUser, history }) => {
  console.log(currentUser);

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
      <hr />
      <p>List</p>
      <div>
        B U Y
        {currentUser.buy.map((item, index) => (
          <div key={index.toString()}>
            <p>poster: {item.poster}</p>
            <p>title: {item.title}</p>
            <p>amount: {item.amount}</p>
            <p>money: {item.money}</p>
            <p>
              <button type="button" onClick={() => onDeleteBoughtHandler(item._id)}>
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>
      <div>
        <hr />S E L L
        {currentUser.sell.map((item, index) => (
          <div key={index.toString()}>
            <p>poster: {item.poster}</p>
            <p>title: {item.title}</p>
            <p>amount: {item.amount + item.bought}</p>
            <p>soll: {item.bought}</p>
            <p>money: {item.money}</p>
            <p>
              <button type="button" onClick={() => onDeleteSelltHandler(item._id)}>
                Delete
              </button>
              <button type="button" onClick={() => onEditSelltHandler(item._id)}>
                Edit
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(Shelf);
