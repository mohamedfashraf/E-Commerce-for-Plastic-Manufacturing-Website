"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

const createPage = (cartItems, subtotal, shipping, total, updateQuantity, removeItem) => {
  return `
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: Arial, sans-serif;
        background-color: white; /* Set the background to white */
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Adjust to start content from the top */
        align-items: center;
      }

      /* Navbar */
      #navbar {
        width: 100%;
        position: fixed; /* Make the navbar fixed to the top */
        top: 0;
        left: 0;
        z-index: 10; /* Ensure it stays on top of other elements */
        background-color: white; /* Ensure navbar background is white */
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
        width: 80%; /* Increase the width of the main container */
        max-width: 1400px; /* Adjusted maximum width */
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 2;
        margin: 120px auto 40px auto; /* Adjust margin to account for fixed navbar */
        color: black; /* Set font color to black */
      }

      /* Cart Items Section */
      .cart-items {
        flex: 2;
        margin-right: 20px;
        max-height: 600px; /* Increase the height as needed */
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
    
    <!-- Main Content Container -->
    <div class="container">
      <div class="cart-items">
        <h2>Your Cart</h2>
        <hr />
        <p>Shopping cart</p>
        <p>You have <span id="item-count">${cartItems.length}</span> items in your cart</p>
        <div id="cart-items-container">
          ${cartItems.map(item => `
            <div class="cart-item">
              <img src="${item.images && item.images[0] ? item.images[0] : 'pallet2.svg'}" alt="${item.productName}" />
              <div class="cart-item-info">
                <span>${item.productName}</span>
                <div class="quantity-controls">
                  <button onclick="updateQuantity('${item.productId}', 'subtract')">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="updateQuantity('${item.productId}', 'add')">+</button>
                </div>
                <span>$${item.totalPrice.toFixed(2)}</span>
              </div>
              <button class="remove-button" onclick="removeItem('${item.productId}')">&times;</button>
            </div>
          `).join('')}
        </div>
      </div>
    
      <div class="summary">
        <h3>Card Details</h3>
        <div class="card-details">
          <form id="checkout-form">
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
    
            <p>Subtotal: $<span id="subtotal">${subtotal.toFixed(2)}</span></p>
            <p>Shipping: $<span id="shipping">${shipping.toFixed(2)}</span></p>
            <p>Total: $<span id="total">${total.toFixed(2)}</span></p>
            <button type="submit">$<span id="total-button">${total.toFixed(2)}</span> Checkout</button>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        function updateQuantity(productId, action) {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", \`http://localhost:7000/\${action}Quantity\`, true);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.withCredentials = true; // Ensure cookies are included in the request
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              location.reload();
            }
          };
          xhr.send(JSON.stringify({ prodId: productId }));
        }

        function removeItem(productId) {
          const xhr = new XMLHttpRequest();
          xhr.open("DELETE", "http://localhost:7000/removeCartItem", true);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.withCredentials = true; // Ensure cookies are included in the request
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              location.reload();
            }
          };
          xhr.send(JSON.stringify({ prodId: productId }));
        }

        function checkout(event) {
          event.preventDefault();
          const orderData = {
            cartItems: ${JSON.stringify(cartItems)},
            totalPrice: ${total.toFixed(2)}
          };
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:7000/createOrder", true);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.withCredentials = true; // Ensure cookies are included in the request
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const clearCartXhr = new XMLHttpRequest();
              clearCartXhr.open("POST", "http://localhost:7000/clearCart", true);
              clearCartXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              clearCartXhr.withCredentials = true; // Ensure cookies are included in the request
              clearCartXhr.onreadystatechange = function () {
                if (clearCartXhr.readyState === 4 && clearCartXhr.status === 200) {
                  alert("Transaction successful! Cart cleared.");
                  location.reload();
                }
              };
              clearCartXhr.send();
            }
          };
          xhr.send(JSON.stringify(orderData));
        }

        window.updateQuantity = updateQuantity;
        window.removeItem = removeItem;
        document.getElementById("checkout-form").addEventListener("submit", checkout);
      });
    </script>
  `;
};

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:7000/cartItems", {
          method: "GET",
          credentials: 'include', // Ensure cookies are included in the request
        });
        const data = await response.json();

        let subtotal = data.reduce((acc, item) => acc + item.totalPrice, 0);
        let shipping = 4.00; // Flat rate shipping for example
        let total = subtotal + shipping;

        if (subtotal == 0) {
          total = 0;
        }
        setCartItems(data);
        setSubtotal(subtotal);
        setShipping(shipping);
        setTotal(total);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <div id="navbar">
        <Navbar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: createPage(cartItems, subtotal, shipping, total) }} />
    </div>
  );
};

export default Page;