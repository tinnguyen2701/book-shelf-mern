/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { REGISTER_REQUEST } from './ducks';
import Button from 'utils/Button';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  > form {
    background: tomato;
    color: white;
    padding: 7%;
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
`;

export default ({ history }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatar);

    store.dispatch({
      type: REGISTER_REQUEST,
      payload: { data: formData, history },
    });
  };

  const setAvatarHandler = e => {
    e.persist();
    setAvatar(e.target.files[0]);
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <p>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email.."
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
          />
        </p>
        {email === '' && <p>Email is required!</p>}
        <p>
          <span>Username</span>
          <input
            type="text"
            placeholder="Username.."
            value={username || ''}
            onChange={e => setUsername(e.target.value)}
          />
        </p>
        {username === '' && <p>Username is required!</p>}
        <p>
          <span>Password:</span>
          <input
            type="password"
            placeholder="Password.."
            value={password || ''}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        {password === '' && <p>Password is required!</p>}
        <p>
          <span>Confirm Password:</span>
          <input
            type="password"
            placeholder="Confirm Password.."
            value={confirm || ''}
            onChange={e => setConfirm(e.target.value)}
          />
        </p>
        {confirm === '' && <p>Confirm password is required!</p>}
        <p>
          <span>avatar:</span>
          <input type="file" onChange={e => setAvatarHandler(e)} />
        </p>
        {avatar === '' && <p>Avatar is required!</p>}
        <p>
          <Button
            type="submit"
            disabled={!email || !username || !password || confirm !== password || !avatar}
          />
        </p>
      </form>
    </Div>
  );
};
