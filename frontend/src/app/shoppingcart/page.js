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

      /* Cart Items Section */
      .cart-items {
        flex: 2;
        margin-right: 20px;
        max-height: 500px; /* Adjust as needed */
        overflow-y: auto;
        padding-right: 10px;
        z-index: 3; /* Ensure the cart items are above the background shape */
      }

      .cart-items h2 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .cart-items hr {
        border: none;
        border-top: 1px solid #ccc;
        margin: 10px 0;
      }

      .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .cart-item img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        margin-right: 20px;
      }

      .cart-item-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cart-item-info span {
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

      /* Summary Section */
      .summary {
        flex: 1;
        background-color: #565ABB;
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        z-index: 3; /* Ensure the summary is above the background shape */
      }

      .summary h3 {
        font-size: 20px;
        margin-bottom: 20px;
      }

      .summary p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 16px;
      }

      .summary button {
        width: 100%;
        padding: 10px;
        background-color: #38b2ac;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
      }

      .summary button:hover {
        background-color: #319795;
      }

      /* Card Details Section */
      .card-details {
        background-color: #565ABB;
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
      }

      .card-details h3 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .card-details img {
        width: 40px;
        margin-right: 10px;
      }

      .card-details form {
        display: flex;
        flex-direction: column;
      }

      .card-details form label {
        margin-bottom: 5px;
        font-size: 14px;
      }

      .card-details form input {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 16px;
      }

      .card-details form input::placeholder {
        color: #b3b3b3;
      }

      .card-details form input[type="text"],
      .card-details form input[type="number"] {
        background-color: #f8f8f8;
      }

      .card-details form .card-row {
        display: flex;
        justify-content: space-between;
      }

      .card-details form .card-row input {
        width: 48%;
      }

      .card-details form button {
        padding: 15px;
        background-color: #38b2ac;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
      }

      .card-details form button:hover {
        background-color: #319795;
      }
    </style>
    <!-- Background Shape -->
    <div class="image-container"></div>
    
    <!-- Navbar -->
    <div id="navbar"></div>
    
    <!-- Main Content Container -->
    <div class="container">
      <!-- Cart Items Section -->
      <div class="cart-items">
        <h2>Your Cart</h2>
        <hr>
        <p>Shopping cart</p>
        <p>You have <span id="item-count">0</span> items in your cart</p>
        <div id="cart-items-container">
          <!-- Cart items will be dynamically added here -->
        </div>
      </div>
    
      <!-- Summary Section -->
      <div class="summary">
        <h3>Card Details</h3>
        <div class="card-details">
          <form>
            <label for="name">Name on card</label>
            <input type="text" id="name" placeholder="Name" required />
            
            <label for="card-number">Card Number</label>
            <input type="number" id="card-number" placeholder="1111 2222 3333 4444" required />
            
            <div class="card-row">
              <div>
                <label for="expiration-date">Expiration date</label>
                <input type="text" id="expiration-date" placeholder="mm/yy" required />
              </div>
              <div>
                <label for="cvv">CVV</label>
                <input type="number" id="cvv" placeholder="123" required />
              </div>
            </div>
    
            <p>Subtotal: $<span id="subtotal">0</span></p>
            <p>Shipping: $<span id="shipping">0</span></p>
            <p>Total: $<span id="total">0</span></p>
            <button type="submit">$<span id="total-button">0</span> Checkout</button>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');
        const totalButtonElement = document.getElementById('total-button');
    
        // Function to update totals
        function updateTotals(subtotal, shipping) {
          const total = subtotal + shipping;
          subtotalElement.innerText = subtotal.toFixed(2);
          shippingElement.innerText = shipping.toFixed(2);
          totalElement.innerText = total.toFixed(2);
          totalButtonElement.innerText = total.toFixed(2);
        }
    
        // Example usage (replace this with actual data fetching from your backend)
        // const exampleSubtotal = 52.00;
        // const exampleShipping = 4.00;
        // updateTotals(exampleSubtotal, exampleShipping);
      });
    </script>
  `;
};

// Add React and ReactDOM imports at the top
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar';

// Main React component for the page
const Page = () => {
  return (
    <div>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: createPage() }} />
    </div>
  );
};

export default Page;
