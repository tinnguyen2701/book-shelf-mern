import React, { useState } from 'react';
import store from 'store';
import { EDIT_USER_REQUEST } from '../auth/ducks';

export default ({ currentUser }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const onClickHandler = () => {
    store.dispatch({
      type: EDIT_USER_REQUEST,
      payload: { username, oldPassword, newPassword, avatar },
    });
  };

  return (
    <div>
      <p>
        Username:
        <input type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
      </p>
      <p>
        Old Password:
        <input
          type="password"
          value={oldPassword || ''}
          onChange={e => setOldPassword(e.target.value)}
        />
      </p>
      <p>
        New Password:
        <input
          type="password"
          value={newPassword || ''}
          onChange={e => setNewPassword(e.target.value)}
        />
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
