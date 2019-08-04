import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGIN_REQUEST } from './ducks';

const Login = ({ currentUser, dispatch, history }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch({ type: LOGIN_REQUEST, payload: { email, password, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      {currentUser === false && <p>Email or password was wrong!</p>}
      <p>
        <input
          type="text"
          placeholder="Email.."
          value={email || ''}
          onChange={e => setEmail(e.target.value)}
        />
        {email === '' && <span>Email is required</span>}
      </p>
      <p>
        <input
          type="password"
          placeholder="Password.."
          value={password || ''}
          onChange={e => setPassword(e.target.value)}
        />
        {password === '' && <span>Password is required</span>}
      </p>
      <p>
        <button type="submit" disabled={!email || !password}>
          Submit
        </button>
      </p>
      <Link to="/auth/verify">forgot your password ?</Link>
    </form>
  );
};
export default connect(state => ({
  currentUser: state.login.currentUser,
}))(Login);
