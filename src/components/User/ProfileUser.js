import React, { useState } from 'react';
import { connect } from 'react-redux';
import { EDIT_USER_REQUEST } from '../auth/ducks';
import { REMOVE_ACCOUNT_REQUEST } from './ducks';

const ProfileUser = ({ currentUser, message, dispatch }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isVisible, setIsVisible] = useState(false);

  const onClickHandler = () => {
    dispatch({
      type: EDIT_USER_REQUEST,
      payload: { username, oldPassword, newPassword, avatar },
    });
  };

  const onRemoveAccountHandler = () => {
    dispatch({
      type: REMOVE_ACCOUNT_REQUEST,
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
      {message && <p>{message}</p>}
      <br />
      <button type="button" onClick={() => setIsVisible(true)}>
        Remove Account
      </button>
      {isVisible && (
        <div>
          <button type="button" onClick={() => onRemoveAccountHandler()}>
            REMOVE
          </button>
          <button type="button" onClick={() => setIsVisible(false)}>
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(state => ({
  message: state.message,
}))(ProfileUser);
