import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ANOTHER_SHELF_REQUEST } from './ducks';
import Shelf from './Shelf';

const Div = styled.div`
  padding: 3% 3%;
`;

const anotherShelf = ({ shelf, match, dispatch }) => {
  useEffect(() => {
    dispatch({ type: ANOTHER_SHELF_REQUEST, payload: match.params.userId });
  }, []);

  return (
    shelf && (
      <Div>
        <p>List sold of {shelf.username}</p>
        {shelf.sell.map((item, index) => (
          <Shelf key={index.toString()} item={item} />
        ))}
      </Div>
    )
  );
};

export default connect(state => ({
  shelf: state.anotherShelf,
}))(anotherShelf);
