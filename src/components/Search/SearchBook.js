import React from 'react';
import styled from 'styled-components';
import Image from 'utils/Image';

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > div:first-child {
    width: 60px;
    border: 1px solid tomato;
    height: 60px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
  }
`;

export default ({ book }) => (
  <Div>
    <div>
      <Image src={book.poster} alt={book.title} size="100%" />
    </div>
    <div>
      <p>title: {book.title}</p>
      <p>money: {book.money}.000vnđ</p>
    </div>
  </Div>
);
