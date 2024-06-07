// src/app/wishlist/page.js
"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
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

const WishlistContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px; /* Adjust the size */
  width: 100%;
  min-height: 80vh; /* Ensures it takes almost the whole vertical part of the page */
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Adjust the font size */
  font-weight: 700;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 10px;
  }

  h3 {
    margin: 1rem 0 0.5rem;
  }

  p {
    margin: 0;
    color: #555;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
  right: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
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
  z-index: -1;
`;

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const wishlistPerPage = 8;

  useEffect(() => {
    // Fetch wishlist from the API
    fetch('/api/wishlist')
      .then(response => response.json())
      .then(data => setWishlist(data));
  }, []);

  // Calculate pagination
  const indexOfLastWishlistItem = currentPage * wishlistPerPage;
  const indexOfFirstWishlistItem = indexOfLastWishlistItem - wishlistPerPage;
  const currentWishlistItems = wishlist.slice(indexOfFirstWishlistItem, indexOfLastWishlistItem);

  const totalPages = Math.ceil(wishlist.length / wishlistPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <WishlistContainer>
          <Title>Wishlist</Title>
          <GridContainer>
            {currentWishlistItems.map((product, index) => (
              <ProductCard key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </ProductCard>
            ))}
          </GridContainer>
          <Pagination>
            <span>Showing {indexOfFirstWishlistItem + 1} to {Math.min(indexOfLastWishlistItem, wishlist.length)} of {wishlist.length} records</span>
            <div>
              <PageButton
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </PageButton>
              {[...Array(totalPages)].map((_, index) => (
                <PageButton
                  key={index}
                  onClick={() => paginate(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || wishlist.length <= wishlistPerPage}
              >
                &gt;
              </PageButton>
            </div>
          </Pagination>
        </WishlistContainer>
        <ImageContainer />
      </Content>
    </MainContainer>
  );
};

export default WishlistPage;
