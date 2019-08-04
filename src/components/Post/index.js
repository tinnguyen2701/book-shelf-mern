// /* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { POST_REQUEST } from './ducks';

const Post = ({ post, match, dispatch }) => {
  useEffect(() => {
    const param = match && match.params.postId;
    dispatch({ type: POST_REQUEST, payload: { param } });
  }, []);
  return <div>{post && post.title}</div>;
};

export default connect(state => ({
  post: state.post,
}))(Post);
