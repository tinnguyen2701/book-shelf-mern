import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Div = styled.div`
  > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    > li > a {
      text-decoration: none;
      color: ${props => props.theme.color};
    }
  }
`;

export default () => (
  <Div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
      <li>
        <Link to="/auth/register">Register</Link>
      </li>
      <li>
        <Link to="/auth/logout">Sign out</Link>
      </li>
    </ul>
  </Div>
);
