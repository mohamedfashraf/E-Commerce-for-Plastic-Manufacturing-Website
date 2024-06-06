// src/components/IconButton.js
"use client";

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75rem;
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  color: ${({ color }) => color || 'black'};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 20px;
    max-width: 20px;
  }
`;

const IconButton = ({ imgSrc, alt, bgColor, color }) => {
  return (
    <StyledButton bgColor={bgColor} color={color}>
      <img src={imgSrc} alt={alt} />
    </StyledButton>
  );
};

export default IconButton;
