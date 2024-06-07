"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  color: black;
  position: relative;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 2; /* Ensures content is above the background */
`;

const ProductContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px; /* Adjust the size */
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3; /* Ensure it stays above the background shape */
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
  z-index: 1; /* Ensure it stays behind the content */
`;

const NavbarContainer = styled.div`
  width: 100%;
  position: fixed; /* Make the navbar fixed to the top */
  top: 0;
  left: 0;
  z-index: 10; /* Ensure it stays on top of other elements */
  background-color: white; /* Ensure navbar background is white */
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ProductDetails = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: grey;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* Ensure buttons wrap on smaller screens */
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: white;
`;

const AddToCartButton = styled(Button)`
  background-color: #38b2ac;
  &:hover {
    background-color: #319795;
  }
`;

const WishlistButton = styled(Button)`
  background-color: #565ABB;
  &:hover {
    background-color: #404080;
  }
`;

const RentButton = styled(Button)`
  background-color: #ff6347; /* Tomato color for Rent button */
  &:hover {
    background-color: #e5533c;
  }
`;

const ReviewsButton = styled(Button)`
  background-color: #ffa500; /* Orange color for Reviews button */
  &:hover {
    background-color: #cc8500;
  }
`;

const Page = () => {
  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <ImageContainer />
      <Content>
        <ProductContainer>
          <ProductImage src="" alt="Product Image" />
          <ProductName>Product Name</ProductName>
          <ProductDetails>Product details go here.</ProductDetails>
          <ButtonContainer>
            <AddToCartButton>Add to Cart</AddToCartButton>
            <WishlistButton>Wishlist</WishlistButton>
            <RentButton>Rent</RentButton>
            <ReviewsButton>Reviews</ReviewsButton>
          </ButtonContainer>
        </ProductContainer>
      </Content>
    </MainContainer>
  );
};

export default Page;