import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { SEARCH_REQUEST } from './duck';
import SearchUser from './SearchUser';
import SearchBook from './SearchBook';

const Search = ({ search, location }) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    store.dispatch({ type: SEARCH_REQUEST, payload: { name: params.get('name') } });
  }, [location]);

  return (
    <div>
      USERS
      {search &&
        search.users &&
        search.users.map((user, index) => <SearchUser key={index.toString()} user={user} />)}
      <hr />
      <br />
      <br />
      BOOKS
      {search &&
        search.books &&
        search.books.map((book, index) => <SearchBook key={index.toString()} book={book} />)}
    </div>
  );
};

export default connect(state => ({
  search: state.search,
}))(Search);
