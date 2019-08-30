import React, { useEffect } from 'react';
import styled from 'styled-components';
import store from 'store';
import { ANOTHER_SHELF_REQUEST } from './ducks';

const Div = styled.div`
  padding: 3% 3%;
`;
export default ({ match }) => {
  useEffect(() => {
    store.dispatch({ type: ANOTHER_SHELF_REQUEST, payload: match.params.userId });
  });

  return <Div>a</Div>;
};
