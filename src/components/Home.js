import React from 'react';
import { connect } from 'react-redux';

const Home = ({ currentUser }) => {
  return <div>welcome {currentUser && currentUser.username}</div>;
};

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Home);
