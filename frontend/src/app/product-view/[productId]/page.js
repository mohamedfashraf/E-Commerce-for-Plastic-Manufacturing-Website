"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
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
  z-index: 2;
`;

const ProductContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
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
`;

const NavbarContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: white;
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
  flex-wrap: wrap;
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
  background-color: #565abb;
  &:hover {
    background-color: #404080;
  }
`;

const RentButton = styled(Button)`
  background-color: #ff6347;
  &:hover {
    background-color: #e5533c;
  }
`;

const ReviewsButton = styled(Button)`
  background-color: #ffa500;
  &:hover {
    background-color: #cc8500;
  }
`;

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const productId = params.productId;

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/product/productdetails/${productId}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching product: {error.message}</p>;
    }

    return (
        <MainContainer>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>
            <ImageContainer />
            <Content>
                <ProductContainer>
                    <ProductImage src={`/${product.images}`} alt={product.name} />
                    <ProductName>{product.name}</ProductName>
                    <ProductDetails>{product.description}</ProductDetails>
                    <ProductDetails><strong>Price:</strong> ${product.price}</ProductDetails>
                    <ProductDetails><strong>Color:</strong> {product.color}</ProductDetails>
                    <ProductDetails><strong>Size:</strong> {product.size}</ProductDetails>
                    <ProductDetails><strong>Material:</strong> {product.material}</ProductDetails>
                    <ProductDetails><strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</ProductDetails>
                    {product.rentalOptions && product.rentalOptions.available && (
                        <>
                            <ProductDetails><strong>Daily Rate:</strong> ${product.rentalOptions.dailyRate}</ProductDetails>
                            <ProductDetails><strong>Deposit:</strong> ${product.rentalOptions.deposit}</ProductDetails>
                        </>
                    )}
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

export default ProductDetailsPage;
