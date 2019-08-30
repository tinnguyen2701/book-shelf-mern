import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import store from 'store';
import { SEARCH_REQUEST } from './duck';
import SearchUser from './SearchUser';
import SearchBook from './SearchBook';

const Div = styled.div`
  padding: 3% 3%;

  p {
    margin-bottom: 10px;
  }
`;

const Search = ({ search, location }) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    store.dispatch({ type: SEARCH_REQUEST, payload: { name: params.get('name') } });
  }, [location]);

  return (
    <Div>
      <p>USERS</p>
      {search &&
        search.users &&
        search.users.map((user, index) => <SearchUser key={index.toString()} user={user} />)}

      <p>BOOKS</p>
      {search &&
        search.books &&
        search.books.map((book, index) => <SearchBook key={index.toString()} book={book} />)}
    </Div>
  );
};

export default connect(state => ({
  search: state.search,
}))(Search);
