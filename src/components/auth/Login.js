import React, { useState } from 'react';
import store from 'store';
import { Link } from 'react-router-dom';
import { LOGIN_REQUEST } from '../ducks';

export default ({ history }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: LOGIN_REQUEST, payload: { email, password, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <p>
        <input
          type="email"
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
