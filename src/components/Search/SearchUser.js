/* eslint no-underscore-dangle: "off" */
import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Image from 'utils/Image';

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > div {
    width: 40px;
    border: 1px solid tomato;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
  }
`;
const ImageWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const SearchUser = ({ history, user }) => (
  <Div>
    <ImageWrapper onClick={() => history.push(`/users/${user._id}`)}>
      <Image src={user.avatar} size="100%" />
    </ImageWrapper>
    {user.username}
  </Div>
);

export default withRouter(SearchUser);
