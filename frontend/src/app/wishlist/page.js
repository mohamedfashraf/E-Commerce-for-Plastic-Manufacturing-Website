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
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  min-height: 80vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  color: white;
  transition: background-color 0.2s ease-in-out;
`;

const RemoveButton = styled(Button)`
  background-color: #ff6347;
  &:hover {
    background-color: #e5533c;
  }
`;

const AddToCartButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
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
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const wishlistPerPage = 8;

  useEffect(() => {
    // Fetch wishlist from the API
    fetch('http://localhost:8080/product/MyWishlist', {
      method: "GET",
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWishlist(data);
        } else {
          console.error('Expected array but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch product details for each wishlist item
    const fetchProductDetails = async () => {
      const productDetailsPromises = wishlist.map(async (wishlistItem) => {
        const response = await fetch(`http://localhost:8080/product/productdetails/${wishlistItem.productId}`, {
          method: "GET",
          credentials: 'include',
        });
        return response.json();
      });
      const productDetails = await Promise.all(productDetailsPromises);
      setProducts(productDetails);
    };

    if (wishlist.length > 0) {
      fetchProductDetails();
    }
  }, [wishlist]);

  const addToCart = async (productId, productName, price) => {
    try {
      const response = await fetch('http://localhost:7000/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId,
          productName,
          price,
          totalPrice: price,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      alert('Item added to cart successfully');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Error adding item to cart');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/product/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }
      setWishlist(wishlist.filter(item => item.productId !== productId));
      alert('Item removed from wishlist successfully');
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      alert('Error removing item from wishlist');
    }
  };

  // Calculate pagination
  const indexOfLastWishlistItem = currentPage * wishlistPerPage;
  const indexOfFirstWishlistItem = indexOfLastWishlistItem - wishlistPerPage;
  const currentWishlistItems = products.slice(indexOfFirstWishlistItem, indexOfLastWishlistItem);

  const totalPages = Math.ceil(products.length / wishlistPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <WishlistContainer>
          <Title>Wishlist</Title>
          <GridContainer>
            {currentWishlistItems.map((product, index) => (
              <ProductCard key={product._id}>
                <img src={product.images} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ButtonContainer>
                  <AddToCartButton onClick={() => addToCart(product._id, product.name, product.price)}>Add to Cart</AddToCartButton>
                  <RemoveButton onClick={() => removeFromWishlist(product._id)}>Remove</RemoveButton>
                </ButtonContainer>
              </ProductCard>
            ))}
          </GridContainer>
          <Pagination>
            <span>Showing {indexOfFirstWishlistItem + 1} to {Math.min(indexOfLastWishlistItem, products.length)} of {products.length} records</span>
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
                disabled={currentPage === totalPages || products.length <= wishlistPerPage}
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
