import React, { useEffect } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import { PAYLOAD_REQUEST } from './ducks';
import Payload from './Payload';

const Admin = ({ payloads }) => {
  useEffect(() => {
    store.dispatch({ type: PAYLOAD_REQUEST });
  }, []);

  return (
    payloads && (
      <div>
        <h1> a d m i n </h1>
        {payloads.map((item, index) => (
          <Payload key={index.toString()} item={item} />
        ))}
      </div>
    )
  );
};

export default connect(state => ({
  payloads: state.payloads,
}))(Admin);
