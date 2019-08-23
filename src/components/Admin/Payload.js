/* eslint no-underscore-dangle: "off" */
import React from 'react';
import store from 'store';
import { APPROVE_PAYLOAD_REQUEST, REJECT_PAYLOAD_REQUEST } from './ducks';

export default ({ item }) => {
  const { title, description, money, poster, images, amount } = item;

  const onApproveHandler = () => {
    store.dispatch({ type: APPROVE_PAYLOAD_REQUEST, payload: item });
  };

  const onRejectHandler = () => {
    store.dispatch({ type: REJECT_PAYLOAD_REQUEST, payload: { id: item._id } });
  };

  return (
    <div>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>money: {money}</p>
      <p>amount: {amount}</p>
      <p>poster: {poster}</p>
      <p>images: {images}</p>
      <button type="button" onClick={() => onApproveHandler()}>
        Approve
      </button>
      <button type="button" onClick={() => onRejectHandler()}>
        Delete
      </button>
    </div>
  );
};
