import React, { useState } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { VERIFY_REQUEST } from './ducks';

const Verify = ({ isVisible, isCheckInfo, history }) => {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: VERIFY_REQUEST, payload: { email, code, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      {isCheckInfo === false && <p>This fields was wrong!</p>}
      {isVisible ? (
        <p>
          <input
            type="text"
            placeholder="Code.."
            value={code || ''}
            onChange={e => setCode(e.target.value)}
          />
          {code === '' && <span>Code is required</span>}
        </p>
      ) : (
        <p>
          <input
            type="text"
            placeholder="Email.."
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
          />
          {email === '' && <span>Email is required</span>}
        </p>
      )}
      <p>
        <button type="submit" disabled={!email}>
          Submit
        </button>
      </p>
    </form>
  );
};

export default connect(state => ({
  isVisible: state.verify.isVisible,
  isCheckInfo: state.verify.isCheckInfo,
}))(Verify);
