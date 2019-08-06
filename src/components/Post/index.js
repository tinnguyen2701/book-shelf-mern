import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { POST_REQUEST, FAVORITE_REQUEST, COMMENT_REQUEST } from './ducks';
import Comment from './Comment';

const Post = ({ post, match, dispatch }) => {
  useEffect(() => {
    dispatch({ type: POST_REQUEST, payload: match.params.postId });
  }, []);

  const [comment, setComment] = useState(null);

  const onClickHandler = () => {
    dispatch({ type: FAVORITE_REQUEST, payload: match.params.postId });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setComment(null);
    dispatch({ type: COMMENT_REQUEST, payload: { postId: match.params.postId, comment } });
  };

  return (
    post && (
      <div>
        <p>title: {post.title}</p>
        <p>poster: {post.poster}</p>
        <p>images: {post.images}</p>
        <p>money: {post.money}</p>
        <p>amount: {post.amount}</p>
        <p>description: {post.description}</p>
        <p>like {post.favorites.length}</p>
        <button type="button" onClick={() => onClickHandler()}>
          Like
        </button>
        <form onSubmit={e => onSubmitHandler(e)}>
          <textarea
            cols="10"
            rows="3"
            value={comment || ''}
            onChange={e => setComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <div>
          {post &&
            post.comments.map((item, index) => (
              <Comment key={index.toString()} comment={item} postId={match.params.postId} />
            ))}
        </div>
      </div>
    )
  );
};

export default connect(state => ({
  post: state.post,
}))(Post);
