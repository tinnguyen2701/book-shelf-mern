/* eslint no-underscore-dangle: "off" */
import React from 'react';
import store from 'store';
import styled from 'styled-components';
import Image from 'utils/Image';
import Button from 'utils/Button';
import { APPROVE_PAYLOAD_REQUEST, REJECT_PAYLOAD_REQUEST } from './ducks';

const Div = styled.div`
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);

  > div {
    display: flex;
    align-items: center;
    margin: 10px 0;

    > div {
      margin-left: 10px;
      width: 70px;
      height: 70px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
    }

    > div:hover {
      position: relative;
      transform: scale(1.08);
      transition: 200ms all;
      box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
    }
  }

  > button {
    margin-right: 10px;
  }
`;

export default ({ item }) => {
  const { title, description, money, poster, images, amount } = item;

  const onApproveHandler = () => {
    store.dispatch({ type: APPROVE_PAYLOAD_REQUEST, payload: item });
  };

  const onRejectHandler = () => {
    store.dispatch({ type: REJECT_PAYLOAD_REQUEST, payload: { id: item._id } });
  };

  return (
    <Div>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>money: {money}.000vnđ</p>
      <p>amount: {amount}</p>
      <div>
        poster:{' '}
        <div>
          <Image src={poster} alt={title} size="100%" />
        </div>
      </div>
      <div>
        images:{' '}
        {images.map((image, index) => (
          <div key={index.toString()}>
            <Image src={image} alt={title} size="100%" />
          </div>
        ))}
      </div>
      <Button type="button" onClick={() => onApproveHandler()} value="Approve" />
      <Button type="button" onClick={() => onRejectHandler()} value="Delete" />
    </Div>
  );
};
