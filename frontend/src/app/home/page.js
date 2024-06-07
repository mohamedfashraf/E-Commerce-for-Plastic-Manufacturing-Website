// src/app/page.js
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  max-width: 600px;
  z-index: 2;
  text-align: left;
  margin-left: 12rem;
`;

const WelcomeText = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 550;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: ${({ small }) => (small ? '0.5rem 1rem' : '0.75rem 1.5rem')};
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  color: ${({ color }) => color || 'black'};
  border-color: ${({ borderColor }) => borderColor || '#000'};
  font-size: ${({ small }) => (small ? '0.8rem' : '1rem')};
  width: ${({ small }) => (small ? '120px' : 'auto')};

  &:hover {
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 66.6%;
  height: 100%;
  background-color: #addfad;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(
    36% 0, 100% 0, 100% 35%, 100% 70%, 100% 100%, 19% 100%, 7% 90%, 2% 58%, 10% 35%, 23% 22%
  );
  z-index: 1;

  img {
    max-width: 100%;
    max-height: 80%;
    border-radius: 15px;
  }
`;

const HomePage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme);
  };

  return (
    <MainContainer>
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Content>
        <TextContainer>
          <WelcomeText>Welcome to Plastic Pallets E-commerce!</WelcomeText>
          <Description>
            At Plastic Pallets E-commerce, we specialize in providing top-quality plastic pallets
            tailored to your specific needs. Whether you're a factory, small business, or an
            individual, we've got you covered with our wide range of offerings.
          </Description>
          <ButtonGroup>
            <ButtonRow>
              <Link href="/products" passHref>
                <Button bgColor="green" color="white">Browse Products</Button>
              </Link>
              <Button>Learn More</Button>
            </ButtonRow>
          </ButtonGroup>
        </TextContainer>
        <ImageContainer>
          <img
            src="factory.png"
            className="absolute top-[210px] left-[300px] w-[559px] h-[400px] z-[7]"
            loading="lazy"
            alt="Factory Image"
          />
        </ImageContainer>
      </Content>
    </MainContainer>
  );
};

export default HomePage;
