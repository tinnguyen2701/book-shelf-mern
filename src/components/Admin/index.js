import React, { useEffect } from 'react';
import styled from 'styled-components';
import store from 'store';
import { connect } from 'react-redux';
import { PAYLOAD_REQUEST } from './ducks';
import Payload from './Payload';

const Div = styled.div`
  padding: 3% 3%;
`;

const Admin = ({ payloads }) => {
  useEffect(() => {
    store.dispatch({ type: PAYLOAD_REQUEST });
  }, []);

  return (
    payloads && (
      <Div>
        {payloads.map((item, index) => (
          <Payload key={index.toString()} item={item} />
        ))}
      </Div>
    )
  );
};

export default connect(state => ({
  payloads: state.payloads,
}))(Admin);
