/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { DELETE_COMMENT_REQUEST, EDIT_COMMENT_REQUEST } from './ducks';

const Comment = ({ comment, postId, currentUser }) => {
  const [isVisible, setVisible] = useState(false);
  const [text, setText] = useState((comment && comment.body) || null);

  const onDeleteHandler = () => {
    store.dispatch({ type: DELETE_COMMENT_REQUEST, payload: { postId, commentId: comment._id } });
  };

  const onEditHandler = e => {
    e.preventDefault();
    setVisible(false);
    store.dispatch({
      type: EDIT_COMMENT_REQUEST,
      payload: { postId, commentId: comment._id, text },
    });
  };

  return (
    <div>
      <p>
        {comment && comment.author && comment.author.avatar}{' '}
        {comment && comment.author && comment.author.username}
      </p>
      {comment && !isVisible ? (
        <p>{text || comment.body}</p>
      ) : (
        <form onSubmit={e => onEditHandler(e)}>
          <input type="text" value={text || comment.body} onChange={e => setText(e.target.value)} />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setVisible(false)}>
            Close
          </button>
        </form>
      )}

      {comment && comment.author && currentUser && currentUser._id === comment.author._id && (
        <div>
          <button type="button" onClick={() => setVisible(true)}>
            Edit
          </button>
          <button type="button" onClick={() => onDeleteHandler()}>
            Delete
          </button>
        </div>
      )}
      <hr />
    </div>
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Comment);
