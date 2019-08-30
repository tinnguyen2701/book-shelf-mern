import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import Button from 'utils/Button';
import { UPDATE_PASSWORD_REQUEST } from './ducks';

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

    span{
      margin-right: 15px;
    }

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
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: { password, history } });
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <p>
          <span>Password</span>
          <input
            type="text"
            placeholder="password.."
            value={password || ''}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        {password === '' && <p>Password is required!</p>}
        <p>
          <Button type="submit" disabled={!password} />
        </p>
      </form>
    </Div>
  );
};
