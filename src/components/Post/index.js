/* eslint no-underscore-dangle: "off" */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Image from 'utils/Image';
import Button from 'utils/Button';
import productLocal from 'utils/productLocal';
import { createAction } from 'dorothy/utils';
import { POST_REQUEST, FAVORITE_REQUEST, COMMENT_REQUEST, UPDATE_CART_REQUEST } from './ducks';
import Comment from './Comment';
import { UPDATE_CART } from '../duck';

const Wrapper = styled.div`
  padding: 3% 3%;

  > div:last-child {
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);

    input {
      border-radius: 4px;
      border: none;
      box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
      padding: 4px;
    }

    form > button {
      margin-left: 5px;
    }
  }
`;

const Div = styled.div`
  display: flex;

  > div:nth-child(1) {
    flex: 1;

    .poster {
      max-width: 100%;
      height: 300px;
      border-radius: 5px;

      > img {
        max-width: 100%;
        border-radius: 10px;
      }
    }

    .images {
      width: 100%;
      display: flex;
      margin: 15px 0px;
      justify-content: center;

      > div {
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
        border-radius: 5px;
      }
      > div:hover {
        position: relative;
        transform: scale(1.08);
        transition: 200ms all;
        box-shadow: 2px 0px 10px rgba(122, 116, 123, 0.83);
      }
    }
  }

  > div:nth-child(2) {
    flex: 1;
    > p,
    button {
      margin-bottom: 15px;
    }

    button {
      margin-right: 5px;
      margin-left: 1px;
    }
  }
`;

const WrapperImage = styled.div`
  cursor: pointer;
`;

const Post = ({ post, match, isAuthenticate, dispatch }) => {
  const { postId } = match.params;

  useEffect(() => {
    dispatch({ type: POST_REQUEST, payload: postId });
  }, []);

  const [comment, setComment] = useState(null);
  const [amount, setAmount] = useState(1);
  const [displayPoster, setDisplayPoster] = useState(null);

  const onClickHandler = () => {
    dispatch({ type: FAVORITE_REQUEST, payload: postId });
  };

  const onAddToCardHandler = () => {
    if (isAuthenticate) {
      dispatch({
        type: UPDATE_CART_REQUEST,
        payload: [
          { bookId: postId, money: post.money, amount, title: post.title, poster: post.poster },
        ],
      });
    } else {
      productLocal(postId, post.money, amount, post.title, post.poster);
      dispatch(createAction(UPDATE_CART, JSON.parse(window.localStorage.getItem('carts'))));
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setComment(null);
    dispatch({ type: COMMENT_REQUEST, payload: { postId, comment } });
  };

  return (
    post && (
      <Wrapper>
        <Div>
          <div>
            <div className="poster">
              <Image src={displayPoster || post.poster} alt="poster" size="100%" checkHeight />
            </div>
            <div className="images">
              <WrapperImage onClick={() => setDisplayPoster(post.poster)}>
                <Image src={post.poster} alt={post.title} size="100%" />
              </WrapperImage>
              {post.images.map((image, index) => (
                <WrapperImage key={index.toString()} onClick={() => setDisplayPoster(image)}>
                  <Image src={image} alt={post.title} size="100%" />
                </WrapperImage>
              ))}
            </div>
          </div>
          <div>
            <p>Title: {post.title}</p>
            <p>Money: {post.money}.000vnđ</p>
            <p>Amount: {post.amount === 0 ? 'out of stock' : post.amount}</p>
            <p>Description: {post.description}</p>
            <p>Like {post.favorites.length}</p>
            <Button type="button" onClick={() => onClickHandler()} value="Like" />

            <p>
              <Button onClick={() => setAmount(amount + 1)} value="+" />
              {amount}
              {'   '}
              <Button onClick={() => amount > 1 && setAmount(amount - 1)} value="-" />
              <Button onClick={() => onAddToCardHandler()} value="Add to cart" />
            </p>
          </div>
        </Div>
        <div>
          <form onSubmit={e => onSubmitHandler(e)}>
            <span>Comment: </span>
            <input type="text" value={comment || ''} onChange={e => setComment(e.target.value)} />
            <Button disabled={!comment} type="submit" value="Send" />
          </form>
          <div>
            {post &&
              post.comments.map(item => <Comment key={item.body} comment={item} postId={postId} />)}
          </div>
        </div>
      </Wrapper>
    )
  );
};

export default connect(state => ({
  post: state.post,
  isAuthenticate: state.login.currentUser,
}))(Post);
