import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: ${props => props.size};
`;

export default ({ src, alt, size }) => <Image src={src} alt={alt} size={size} />;
