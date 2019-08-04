/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 30%;
  border: 1px solid tomato;
`;
export default ({ book, history }) => {
  const { title, description, poster, money, amount } = book;
  return (
    <Div>
      <div>{title}</div>
      <div>anh: {poster}</div>
      <div>{money}</div>
      <div>{description}</div>
      <div>{amount}</div>
      <button type="button" onClick={() => history.push(`/post/${book._id}`)}>
        More
      </button>
    </Div>
  );
};
