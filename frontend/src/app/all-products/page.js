"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
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

const FavouritesContainer = styled.div`
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
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;

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

  .buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;

    button {
      padding: 0.5rem;
      border: none;
      background: none;
      cursor: pointer;
      color: #28a745;
      font-size: 1.5rem;
      transition: color 0.3s ease;

      &:hover {
        color: #218838;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.25rem;

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

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 8;
  const images = ['pallet1.svg', 'pallet2.svg', 'pallet3.svg', 'pallet4.svg'];
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/product/getAllProducts');
        const data = await response.json();
        const productsWithImages = data.map((product, index) => ({
          ...product,
          image: images[index % images.length]
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  const handleProductClick = (productId) => {
    router.push(`/product-view/${productId}`);
  };

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <FavouritesContainer>
          <Title>Products</Title>
          <GridContainer>
            {currentProducts.map((product) => (
              <ProductCard key={product._id} onClick={() => handleProductClick(product._id)}>
                <img src={`/${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="buttons">
                  <button>
                    <FontAwesomeIcon icon={faShoppingCart} title="Add to Cart" />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faHeart} title="Add to Wishlist" />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faStar} title="Add to Favorites" />
                  </button>
                </div>
              </ProductCard>
            ))}
          </GridContainer>
          <Pagination>
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
              disabled={currentPage === totalPages || products.length <= productsPerPage}
            >
              &gt;
            </PageButton>
          </Pagination>
        </FavouritesContainer>
        <ImageContainer />
      </Content>
    </MainContainer>
  );
};

export default AllProductsPage;
