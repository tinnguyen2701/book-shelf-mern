import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  ${props => (props.checkHeight ? `height: ${props.size}` : `width: ${props.size}`)}
`;

export default ({ src, alt, size, checkHeight = false }) => (
  <Image src={src} alt={alt} size={size} checkHeight={checkHeight} />
);
