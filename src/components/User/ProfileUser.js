/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Image from 'utils/Image';
import Button from 'utils/Button';
import { EDIT_USER_REQUEST } from '../auth/ducks';
import { REMOVE_ACCOUNT_REQUEST } from './ducks';

const Div = styled.div`
  width: 50%;
  left: 50%;
  transform: translateX(50%);

  > p {
    margin: 10px 10px 10px 0;

    > :first-child {
      width: 30%;
      display: inline-block;
    }
    > :last-child {
      width: 70%;
      display: inline-block;
    }
  }

  > p:nth-child(4) > span {
    display: flex;
    align-items: center;
  }

  button {
    margin-bottom: 10px;
  }

  input {
    border-radius: 5px;
    border: none;
    padding: 5px;
  }
`;

const ProfileUser = ({ currentUser, message, dispatch }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const displayAvatar = currentUser.avatar;

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);
    formData.append('avatar', avatar);

    dispatch({
      type: EDIT_USER_REQUEST,
      payload: formData,
    });
  };

  const onRemoveAccountHandler = () => {
    dispatch({
      type: REMOVE_ACCOUNT_REQUEST,
    });
  };

  const setAvatarHandler = e => {
    e.persist();
    setAvatar(e.target.files[0]);
  };

  return (
    <Div>
      <p>
        <span>Username:</span>
        <input type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
      </p>
      <p>
        <span>Old Password:</span>
        <input
          type="password"
          value={oldPassword || ''}
          onChange={e => setOldPassword(e.target.value)}
        />
      </p>
      <p>
        <span>New Password:</span>
        <input
          type="password"
          value={newPassword || ''}
          onChange={e => setNewPassword(e.target.value)}
        />
      </p>
      <p>
        <span>
          Avatar: <Image src={displayAvatar} size="64px" />
        </span>
        <input type="file" onChange={e => setAvatarHandler(e)} />
      </p>
      <p>
        <Button onClick={() => onClickHandler()} value="Save" disabled={!avatar} />
        <Button onClick={() => setIsVisible(true)} value="Remove Account" />
      </p>
      {message && <p>{message}</p>}
      <br />
      {isVisible && (
        <div>
          <Button onClick={() => onRemoveAccountHandler()} value="REMOVE" />
          <Button onClick={() => setIsVisible(false)} value="Cancel" />
        </div>
      )}
    </Div>
  );
};

export default connect(state => ({
  message: state.message,
}))(ProfileUser);
