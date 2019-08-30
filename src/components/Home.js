import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BOOKS_REQUEST } from './duck';
import Book from './Book';

const Div = styled.div`
  padding: 3% 3%;
`;

const Home = ({ books, currentUser, dispatch, history }) => {
  useEffect(() => {
    dispatch({ type: BOOKS_REQUEST });
  }, []);

  return (
    <Div>
      {books.map((book, index) => (
        <Book key={index.toString()} history={history} book={book} isAuthenticate={currentUser} />
      ))}
    </Div>
  );
};

export default connect(state => ({
  books: state.books.books,
  currentUser: state.login.currentUser,
}))(Home);
