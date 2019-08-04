import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BOOKS_REQUEST } from './duck';
import Book from './Book';

const Div = styled.div`
  display: flex;

  > div:first-child {
    width: 20%;
  }

  > div:last-child {
    width: 80%;
    display: flex;
  }
`;

const Home = ({ books, dispatch, history }) => {
  useEffect(() => {
    dispatch({ type: BOOKS_REQUEST });
  }, []);

  return (
    <Div>
      <div>category</div>
      <div>
        {books.map((book, index) => (
          <Book key={index.toString()} history={history} book={book} />
        ))}
      </div>
    </Div>
  );
};

export default connect(state => ({
  books: state.books,
}))(Home);
