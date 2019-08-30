import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: #383030;
  color: white;
  padding: 5px;
  border-radius: 5px;
  ${props => (!props.disabled ? 'cursor: pointer' : 'background: slategray;')}
`;

export default ({ value, type, onClick = false, disabled }) =>
  onClick === false ? (
    <Button type={type || 'button'} disabled={disabled}>
      {value || 'Submit'}
    </Button>
  ) : (
    <Button onClick={() => onClick()} type={type || 'button'} disabled={disabled}>
      {value || 'Submit'}
    </Button>
  );
