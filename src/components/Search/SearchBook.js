/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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

const ImageWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const SearchBook = ({ history, book }) => (
  <Div>
    <ImageWrapper onClick={() => history.push(`/post/${book._id}`)}>
      <Image src={book.poster} alt={book.title} size="100%" />
    </ImageWrapper>
    <div>
      <p>title: {book.title}</p>
      <p>money: {book.money}.000vnđ</p>
    </div>
  </Div>
);

export default withRouter(SearchBook);
