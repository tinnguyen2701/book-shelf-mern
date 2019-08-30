import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import store from 'store';
import { VERIFY_REQUEST } from './ducks';
import Button from '../../utils/Button';

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

const Verify = ({ isVisible, isCheckInfo, history }) => {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: VERIFY_REQUEST, payload: { email, code, history } });
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        {isCheckInfo === false && <p>This fields was wrong!</p>}
        {isVisible ? (
          <div>
            <p>
              <span>Code: </span>
              <input
                type="text"
                placeholder="Code.."
                value={code || ''}
                onChange={e => setCode(e.target.value)}
              />
            </p>
            {code === '' && <p>Code is required!</p>}
          </div>
        ) : (
          <div>
            <p>
              <span>Email: </span>
              <input
                type="text"
                placeholder="Email.."
                value={email || ''}
                onChange={e => setEmail(e.target.value)}
              />
            </p>
            {email === '' && <p>Email is required!</p>}
          </div>
        )}
        <p>
          <Button type="submit" disabled={!email || !code} />
        </p>
      </form>
    </Div>
  );
};

export default connect(state => ({
  isVisible: state.verify.isVisible,
  isCheckInfo: state.verify.isCheckInfo,
}))(Verify);
