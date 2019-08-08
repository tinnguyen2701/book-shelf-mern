import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeToken } from 'dorothy/utils/callApi';
import { createAction } from 'dorothy/utils';
import { SIGN_OUT } from '../auth/ducks';

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

const Header = ({ history, currentUser, dispatch }) => {
  const onClickHandler = e => {
    e.preventDefault();
    window.localStorage.removeItem('JWT');
    removeToken();
    dispatch(createAction(SIGN_OUT));
    history.push('/auth/login');
  };

  return (
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
            Your cart ({currentUser && currentUser.carts.length})
          </Link>
        </li>
        <li>
          <Link to="/auth/logout" onClick={e => onClickHandler(e, history)}>
            Sign out
          </Link>
        </li>
        <li>
          <Link to="/sell">Sell</Link>
        </li>
      </ul>
    </Div>
  );
};

export default withRouter(
  connect(state => ({
    currentUser: state.login.currentUser,
  }))(Header),
);
