import React, { useState } from 'react';
import store from 'store';
import { EDIT_USER_REQUEST } from '../auth/ducks';

export default ({ currentUser }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const onClickHandler = () => {
    store.dispatch({ type: EDIT_USER_REQUEST, payload: { username, password, setAvatar } });
  };

  return (
    <div>
      <p>
        Username:
        <input type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
      </p>
      <p>
        Old Password:
        <input type="password" value={password || ''} onChange={e => setPassword(e.target.value)} />
      </p>
      <p>
        New Password:
        <input type="password" value={password || ''} onChange={e => setPassword(e.target.value)} />
      </p>
      <p>
        Avatar:
        <input type="text" value={avatar || ''} onChange={e => setAvatar(e.target.value)} />
      </p>
      <button type="button" onClick={() => onClickHandler()}>
        Save
      </button>
    </div>
  );
};
