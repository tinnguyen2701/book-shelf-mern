/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Image from 'utils/Image';
import Button from 'utils/Button';
import store from 'store';
import { DELETE_COMMENT_REQUEST, EDIT_COMMENT_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  margin: 15px 0;
  button {
    margin-right: 5px;
  }

  > div:first-child {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid tomato;
    margin-right: 15px;
  }

  form {
    margin: 5px 0;
  }
`;

const Comment = ({ comment, postId, currentUser }) => {
  const { body } = comment;
  const [isVisible, setVisible] = useState(false);
  const [text, setText] = useState(body || null);

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
    <Div>
      <div>
        <Image src={comment.author.avatar} size="100%" />
      </div>
      <div>
        {comment.author.username}
        <div>
          {comment && !isVisible ? (
            <p>{body}</p>
          ) : (
            <form onSubmit={e => onEditHandler(e)}>
              <input type="text" value={text || ''} onChange={e => setText(e.target.value)} />
              <Button type="submit" value="Update" />
              <Button onClick={() => setVisible(false)} value="Close" />
            </form>
          )}

          {comment && comment.author && currentUser && currentUser._id === comment.author._id && (
            <div>
              <Button onClick={() => setVisible(true)} value="Edit" />
              <Button onClick={() => onDeleteHandler()} value="Delete" />
            </div>
          )}
        </div>
      </div>
    </Div>
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Comment);
