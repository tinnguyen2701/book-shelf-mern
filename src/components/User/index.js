import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ProfileUser from './ProfileUser';
import Shelf from './Shelf';

const Div = styled.div`
  padding: 3% 3%;
`;

const User = ({ currentUser }) => {
  return (
    currentUser && (
      <Div>
        <ProfileUser currentUser={currentUser} />
        <Shelf currentUser={currentUser} />
      </Div>
    )
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser,
}))(User);
