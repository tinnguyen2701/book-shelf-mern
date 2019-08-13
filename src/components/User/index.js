import React from 'react';
import { connect } from 'react-redux';
import ProfileUser from './ProfileUser';

const User = ({ currentUser }) =>
  currentUser && (
    <div>
      <ProfileUser currentUser={currentUser} />
    </div>
  );

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(User);
