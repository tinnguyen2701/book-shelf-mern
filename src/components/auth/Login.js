import React, { useState } from 'react';
import store from 'store';
import { LOGIN_REQUEST } from '../ducks';

export default ({ history }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [visible, setVisible] = useState(false);

  const onClickHandler = e => {
    e.preventDefault();
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: LOGIN_REQUEST, payload: { email, password, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
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
          type="text"
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
      <a href="remember" onClick={e => onClickHandler(e)}>
        forgot your password ?
      </a>
    </form>
  );
};
