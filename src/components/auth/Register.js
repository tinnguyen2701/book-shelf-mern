import React, { useState } from 'react';
import store from 'store';
import { REGISTER_REQUEST } from './ducks';

export default ({ history }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({
      type: REGISTER_REQUEST,
      payload: { email, username, password, avatar, history },
    });
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
          placeholder="Username.."
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
        {username === '' && <span>Username is required</span>}
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
        <input
          type="text"
          placeholder="Confirm Password.."
          value={confirm || ''}
          onChange={e => setConfirm(e.target.value)}
        />
        {confirm === '' && <span>Confirm password is required</span>}
      </p>
      <p>
        <input
          type="text"
          placeholder="Avatar.."
          value={avatar || ''}
          onChange={e => setAvatar(e.target.value)}
        />
        {avatar === '' && <span>Avatar is required</span>}
      </p>
      <p>
        <button
          type="submit"
          disabled={!email || !username || !password || confirm !== password || !avatar}
        >
          Submit
        </button>
      </p>
    </form>
  );
};
