"use client";

import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f8f8;
  color: var(--main-text-color);
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const ShoppingCartContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const CartItemsContainer = styled.div`
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60%;
  margin-right: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
`;

const SummaryContainer = styled.div`
  flex: 1;
  background-color: #565ABB;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  flex: 1;
  background: #addfad;
  clip-path: polygon(
    36% 0, 100% 0, 100% 35%, 100% 70%, 100% 100%, 19% 100%, 7% 90%, 2% 58%, 10% 35%, 23% 22%
  );
`;

const ShoppingCartPage = () => {
    return (
        <MainContainer>
            <Navbar />
            <Content>
                <ShoppingCartContainer>
                    <CartItemsContainer>
                        <h2>Your Cart</h2>
                        <hr />
                        <p>Shopping cart</p>
                        <p>You have <span id="item-count">0</span> items in your cart</p>
                        <div id="cart-items-container">
                            <div className="cart-item">
                                <img src="https://via.placeholder.com/60" alt="Pallet 1" />
                                <div className="cart-item-info">
                                    <span>Pallet 1</span>
                                    <div className="quantity-controls">
                                        <button>-</button>
                                        <span>1</span>
                                        <button>+</button>
                                    </div>
                                    <span>$10</span>
                                    <button className="remove-button">🗑</button>
                                </div>
                            </div>
                            <div className="cart-item">
                                <img src="https://via.placeholder.com/60" alt="Pallet 2" />
                                <div className="cart-item-info">
                                    <span>Pallet 2</span>
                                    <div className="quantity-controls">
                                        <button>-</button>
                                        <span>1</span>
                                        <button>+</button>
                                    </div>
                                    <span>$12</span>
                                    <button className="remove-button">🗑</button>
                                </div>
                            </div>
                            <div className="cart-item">
                                <img src="https://via.placeholder.com/60" alt="Pallet 3" />
                                <div className="cart-item-info">
                                    <span>Pallet 3</span>
                                    <div className="quantity-controls">
                                        <button>-</button>
                                        <span>2</span>
                                        <button>+</button>
                                    </div>
                                    <span>$30</span>
                                    <button className="remove-button">🗑</button>
                                </div>
                            </div>
                        </div>
                    </CartItemsContainer>
                    <SummaryContainer>
                        <h3>Card Details</h3>
                        <div className="card-details">
                            <form>
                                <label htmlFor="name">Name on card</label>
                                <input type="text" id="name" placeholder="Name" required />
                                <label htmlFor="card-number">Card Number</label>
                                <input type="number" id="card-number" placeholder="1111 2222 3333 4444" required />
                                <div className="card-row">
                                    <div>
                                        <label htmlFor="expiration-date">Expiration date</label>
                                        <input type="text" id="expiration-date" placeholder="mm/yy" required />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv">CVV</label>
                                        <input type="number" id="cvv" placeholder="123" required />
                                    </div>
                                </div>
                                <p>Subtotal: $<span id="subtotal">0</span></p>
                                <p>Shipping: $<span id="shipping">0</span></p>
                                <p>Total: $<span id="total">0</span></p>
                                <button type="submit">$<span id="total-button">0</span> Checkout</button>
                            </form>
                        </div>
                    </SummaryContainer>
                    <ImageContainer />
                </ShoppingCartContainer>
            </Content>
            <style jsx>{`
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
      `}</style>
        </MainContainer>
    );
};

export default ShoppingCartPage;