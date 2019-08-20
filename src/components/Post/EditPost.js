/* eslint no-underscore-dangle: "off" */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { EDIT_SELL_REQUEST } from '../User/ducks';
import EditForm from './EditForm';

const EditPost = ({ book, status, match }) => {
  useEffect(() => {
    store.dispatch({ type: EDIT_SELL_REQUEST, payload: match.params.postId });
  }, []);

  return book && <EditForm book={book} status={status} />;
};

export default connect(state => ({
  book: state.editSell.book,
  status: state.editSell.status,
}))(EditPost);
