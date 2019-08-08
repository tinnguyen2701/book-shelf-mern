/* eslint no-underscore-dangle: "off" */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import productLocal from 'utils/productLocal';
import { POST_REQUEST, FAVORITE_REQUEST, COMMENT_REQUEST, UPDATE_CART_REQUEST } from './ducks';
import Comment from './Comment';

const Post = ({ post, match, isAuthenticate, dispatch }) => {
  const { postId } = match.params;

  useEffect(() => {
    dispatch({ type: POST_REQUEST, payload: postId });
  }, []);

  const [comment, setComment] = useState(null);
  const [amount, setAmount] = useState(1);

  const onClickHandler = () => {
    dispatch({ type: FAVORITE_REQUEST, payload: postId });
  };

  const onAddToCardHandler = () => {
    if (isAuthenticate) {
      dispatch({ type: UPDATE_CART_REQUEST, payload: [{ bookId: postId, amount }] });
    } else {
      productLocal(postId, amount);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setComment(null);
    dispatch({ type: COMMENT_REQUEST, payload: { postId, comment } });
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

        <p>
          <button type="button" onClick={() => setAmount(amount + 1)}>
            +
          </button>
          {amount}
          <button type="button" onClick={() => amount > 1 && setAmount(amount - 1)}>
            -
          </button>
          <button type="button" onClick={() => onAddToCardHandler()}>
            Add to cart
          </button>
        </p>

        <form onSubmit={e => onSubmitHandler(e)}>
          <input type="text" value={comment || ''} onChange={e => setComment(e.target.value)} />
          <button disabled={!comment} type="submit">
            Send
          </button>
        </form>
        <div>
          {post &&
            post.comments.map(item => <Comment key={item.body} comment={item} postId={postId} />)}
        </div>
      </div>
    )
  );
};

export default connect(state => ({
  post: state.post,
  isAuthenticate: state.login.currentUser,
}))(Post);
