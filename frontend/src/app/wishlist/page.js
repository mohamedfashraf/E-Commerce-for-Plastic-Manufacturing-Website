import React from 'react';
import Navbar from '../components/Navbar';

const createPage = () => {
    return `
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: Arial, sans-serif;
          background-color: #f8f8f8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
  
        /* Background Shape */
        .image-container {
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
        }
  
        /* Container */
        .container {
          width: 70%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
          margin: 40px auto;
        }
  
        /* Wishlist Items Section */
        .wishlist-items {
          flex: 2;
          margin-right: 20px;
          max-height: 500px; /* Adjust as needed */
          overflow-y: auto;
          padding-right: 10px;
          z-index: 3; /* Ensure the wishlist items are above the background shape */
        }
  
        .wishlist-items h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
  
        .wishlist-items hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 10px 0;
        }
  
        .wishlist-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
  
        .wishlist-item img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          margin-right: 20px;
        }
  
        .wishlist-item-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
  
        .wishlist-item-info span {
          margin-right: 20px;
        }
  
        .quantity-controls {
          display: flex;
          align-items: center;
        }
  
        .quantity-controls button {
          background-color: #ddd;
          border: none;
          padding: 5px;
          cursor: pointer;
          border-radius: 4px;
          margin: 0 5px;
        }
  
        .quantity-controls span {
          font-size: 16px;
        }
  
        .remove-button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #ff6b6b;
        }
  
        .remove-button:hover {
          color: #ff3b3b;
        }
      </style>
      <!-- Background Shape -->
      <div class="image-container"></div>
      
      <!-- Main Content Container -->
      <div class="container">
        <!-- Wishlist Items Section -->
        <div class="wishlist-items">
          <h2>Your Wishlist</h2>
          <hr>
          <p>Shopping wishlist</p>
          <p>You have <span id="item-count">0</span> items in your wishlist</p>
          <div id="wishlist-items-container">
            <!-- Wishlist items will be dynamically added here -->
            <div class="wishlist-item">
              <img src="https://via.placeholder.com/60" alt="Pallet 1" />
              <div class="wishlist-item-info">
                <span>Pallet 1</span>
                <div class="quantity-controls">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <span>$10</span>
                <button class="remove-button">🗑️</button>
              </div>
            </div>
            <div class="wishlist-item">
              <img src="https://via.placeholder.com/60" alt="Pallet 2" />
              <div class="wishlist-item-info">
                <span>Pallet 2</span>
                <div class="quantity-controls">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <span>$12</span>
                <button class="remove-button">🗑️</button>
              </div>
            </div>
            <div class="wishlist-item">
              <img src="https://via.placeholder.com/60" alt="Pallet 3" />
              <div class="wishlist-item-info">
                <span>Pallet 3</span>
                <div class="quantity-controls">
                  <button>-</button>
                  <span>2</span>
                  <button>+</button>
                </div>
                <span>$30</span>
                <button class="remove-button">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          const itemCountElement = document.getElementById('item-count');
  
          // Update item count based on the number of items
          const updateItemCount = () => {
            const itemCount = document.querySelectorAll('.wishlist-item').length;
            itemCountElement.innerText = itemCount;
          };
  
          // Initial update
          updateItemCount();
        });
      </script>
    `;
  };
  
  // Add React and ReactDOM imports at the top
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Navbar from '../components/Navbar';
  
  // Main React component for the page
  const WishlistPage = () => {
    return (
      <div>
        <Navbar />
        <div dangerouslySetInnerHTML={{ __html: createPage() }} />
      </div>
    );
  };
  
  export default WishlistPage;
  