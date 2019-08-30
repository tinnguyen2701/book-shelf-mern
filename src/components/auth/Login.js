import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LOGIN_REQUEST } from './ducks';
import Button from '../../utils/Button';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  > form {
    background: tomato;
    color: white;
    padding: 6%;
    border-radius: 5px;
    box-shadow: 1px 0px 5px rgba(122, 116, 123, 0.83);
    margin: 2%;

    input {
      float: right;
      border-radius: 5px;
      border: none;
      padding: 5px;
    }

    p {
      margin-bottom: 10px;
    }

    a {
      color: white;
    }
  }
`;

const Login = ({ currentUser, dispatch, history }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch({ type: LOGIN_REQUEST, payload: { email, password, history } });
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        {currentUser === false && <p>Email or password was wrong!</p>}
        <p>
          <span>Email: </span>
          <input
            type="text"
            placeholder="Email.."
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
          />
        </p>

        {email === '' && <p>Email is required!</p>}
        <p>
          <span>Password: </span>
          <input
            type="password"
            placeholder="Password.."
            value={password || ''}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        {password === '' && <p>Password is required!</p>}
        <p>
          <Button type="submit" disabled={!email || !password} />
        </p>
        <Link to="/auth/verify">forgot your password ?</Link>
      </form>
    </Div>
  );
};
export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Login);
