import React from 'react';
import store from 'store';
import { APPROVE_PAYLOAD_REQUEST } from './ducks';

export default ({ item }) => {
  const { title, description, money, poster, images } = item;

  const onApproveHandler = () => {
    store.dispatch({ type: APPROVE_PAYLOAD_REQUEST, payload: item });
  };

  return (
    <div>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>money: {money}</p>
      <p>poster: {poster}</p>
      <p>images: {images}</p>
      <button type="button" onClick={() => onApproveHandler()}>
        Approve
      </button>
      <button type="button">Delete</button>
    </div>
  );
};
