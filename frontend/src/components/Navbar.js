// src/components/Navbar.js
"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // Import Link from Next.js

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--nav-bg-color);
  color: var(--nav-text-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: var(--nav-text-color);
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #0056b3;
    color: white;
  }

  &.divider {
    border-top: 1px solid #e0e0e0;
    padding-top: 0.5rem;
  }
`;

const SwitchContainer = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  inset: 0;
  border: 2px solid #414141;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#333' : '#ccc')};

  &:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.2em;
    bottom: 0.2em;
    background-color: white;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  }
`;

const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <Nav>
      <Logo>
        <img src="/logo.png" alt="Logo" />
        E-Commerce for Plastic Manufacturing
      </Logo>
      <NavLinks>
        <SearchBar type="text" placeholder="Search essentials, groceries and more..." />
        {/* Use Next.js's Link */}
        <IconButton onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} />
          {dropdownOpen && (
            <DropdownMenu>
              <Link href="/profile" passHref>
                <DropdownItem onClick={handleItemClick}>My Profile</DropdownItem>
              </Link>
              <Link href="/orders" passHref>
                <DropdownItem onClick={handleItemClick}>My Orders</DropdownItem>
              </Link>
              <Link href="/favourites" passHref>
                <DropdownItem onClick={handleItemClick}>Favourites</DropdownItem>
              </Link>
              <Link href="/wishlist" passHref>
                <DropdownItem onClick={handleItemClick}>Wishlist</DropdownItem>
              </Link>
              <DropdownItem className="divider" />
              <Link href="/logout" passHref>
                <DropdownItem onClick={handleItemClick}>Logout</DropdownItem>
              </Link>
            </DropdownMenu>
          )}
        </IconButton>
        <IconButton><FontAwesomeIcon icon={faShoppingCart} /></IconButton>
        <SwitchContainer className="switch">
          <SwitchInput type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
          <Slider className="slider" isDarkTheme={isDarkTheme} />
        </SwitchContainer>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
