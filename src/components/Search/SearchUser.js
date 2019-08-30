import React from 'react';
import styled from 'styled-components';
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

export default ({ user }) => (
  <Div>
    <div>
      <Image src={user.avatar} size="100%" />
    </div>{' '}
    {user.username}
  </Div>
);
