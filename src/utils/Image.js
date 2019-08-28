import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: ${props => props.size}px
  height: ${props => props.size}px
`;

export default ({ src, alt, size }) => <Image src={src} alt={alt} size={size} />;
