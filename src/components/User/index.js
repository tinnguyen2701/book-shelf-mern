import React from 'react';
import { connect } from 'react-redux';
import ProfileUser from './ProfileUser';
import Shelf from './Shelf';

const User = ({ currentUser }) =>
  currentUser && (
    <div>
      <ProfileUser currentUser={currentUser} />
      <Shelf currentUser={currentUser} />
    </div>
  );

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(User);
