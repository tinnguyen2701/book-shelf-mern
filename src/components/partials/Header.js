import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { removeToken } from 'dorothy/utils/callApi';

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

const onClickHandler = (e, history) => {
  e.preventDefault();
  window.localStorage.removeItem('JWT');
  removeToken();
  history.push('/auth/login');
};

const Header = ({ history }) => (
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
        <Link to="/auth/logout" onClick={e => onClickHandler(e, history)}>
          Sign out
        </Link>
      </li>
    </ul>
  </Div>
);

export default withRouter(Header);
