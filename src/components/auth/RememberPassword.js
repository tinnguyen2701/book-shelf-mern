import React, { useState } from 'react';
import store from 'store';
import { UPDATE_PASSWORD_REQUEST } from '../ducks';

export default ({ history }) => {
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: { password, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <p>
        <input
          type="text"
          placeholder="password.."
          value={password || ''}
          onChange={e => setPassword(e.target.value)}
        />
        {password === '' && <span>password is required</span>}
      </p>
      <p>
        <button type="submit" disabled={!password}>
          Submit
        </button>
      </p>
    </form>
  );
};
