/* eslint no-underscore-dangle: "off" */
import React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { DELETE_COMMENT_REQUEST } from './ducks';

const Comment = ({ comment, postId, currentUser }) => {
  const onDeleteHandler = () => {
    store.dispatch({ type: DELETE_COMMENT_REQUEST, payload: { postId, commentId: comment._id } });
  };

  return (
    <div>
      <p>
        {comment && comment.author && comment.author.avatar}{' '}
        {comment && comment.author && comment.author.username}
      </p>
      <p>{comment && comment.body}</p>

      {comment && comment.author && currentUser === comment.author._id && (
        <button type="button" onClick={() => onDeleteHandler()}>
          Delete
        </button>
      )}
      <hr />
    </div>
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser._id,
}))(Comment);
