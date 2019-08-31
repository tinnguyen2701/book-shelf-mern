/* eslint no-underscore-dangle: "off" */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'utils/Button';
import Image from 'utils/Image';
import { removeToken } from 'dorothy/utils/callApi';
import { createAction } from 'dorothy/utils';
import { SIGN_OUT } from '../auth/ducks';
import { UPDATE_CART } from '../duck';
import 'font-awesome/css/font-awesome.min.css';

const Div = styled.div`
  > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme.backgroundColor};
    padding: 5px;

    > li > a {
      font-size: 1em;
      text-decoration: none;
      color: white;
    }

    a:active {
      color: #383030;
    }

    > li > form > input {
      border-radius: 5px;
      border: none;
      padding: 5px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    > li > form > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const Header = ({ history, currentUser, carts, dispatch }) => {
  const [value, setValue] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      search: `?name=${value}`,
    });
  };

  const onClickHandler = e => {
    e.preventDefault();
    window.localStorage.removeItem('JWT');
    removeToken();
    dispatch(createAction(SIGN_OUT));
    dispatch(createAction(UPDATE_CART, []));
    history.push('/auth/login');
  };

  return (
    <Div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <form onSubmit={e => onSubmitHandler(e)}>
            <input
              type="text"
              placeholder="Search .. "
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <Button type="submit" value="Search" disabled={!value} />
          </form>
        </li>
        {!currentUser && (
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        )}
        {!currentUser && (
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to="/sell">Sell</Link>
          </li>
        )}
        {currentUser && currentUser.email === process.env.REACT_APP_MAIL_ADMIN && (
          <li>
            <Link to="/admin">Manage</Link>
          </li>
        )}

        <li>
          <Link to="/carts">
            <i className="fa fa-cart-plus" /> (
            {currentUser ? currentUser.carts.length : carts.length})
          </Link>
        </li>
        {currentUser && (
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={currentUser.avatar} alt="avatar" size="30px" checkHeight />{' '}
            <Link to="/user">{currentUser.username}</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to="/auth/logout" onClick={e => onClickHandler(e, history)}>
              Sign out
            </Link>
          </li>
        )}
      </ul>
    </Div>
  );
};

export default withRouter(
  connect(state => ({
    currentUser: state.login.currentUser,
    carts: state.books.carts,
  }))(Header),
);
