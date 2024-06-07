import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--nav-bg-color);
  color: var(--nav-text-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  height: 50px; /* Adjust the height as needed */
  margin-right: 10px;
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
  top: calc(100% + 10px);
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 1000;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 0.5rem;
  font-size: 0.9rem;
  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
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
    transform: ${({ isDarkTheme }) => (isDarkTheme ? 'translateX(1.5em)' : 'translateX(0)')};
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
      <LogoLink href="/home">
        <LogoImage src="/logo.png" alt="Logo" />
        E-Commerce for Plastic Manufacturing
      </LogoLink>
      <NavLinks>
        <SearchBar type="text" placeholder="Search essentials, groceries and more..." />
        <IconButton onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} />
          <DropdownMenu open={dropdownOpen}>
            <DropdownItem onClick={handleItemClick}>
              <Link href="/profile" passHref>
                My Profile
              </Link>
            </DropdownItem>
            <DropdownItem onClick={handleItemClick}>
              <Link href="/orders" passHref>
                My Orders
              </Link>
            </DropdownItem>
            <DropdownItem onClick={handleItemClick}>
              <Link href="/favourites" passHref>
                Favourites
              </Link>
            </DropdownItem>
            <DropdownItem onClick={handleItemClick}>
              <Link href="/wishlist" passHref>
                Wishlist
              </Link>
            </DropdownItem>
            <DropdownItem onClick={handleItemClick}>
              <Link href="/logout" passHref>
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </IconButton>
        <Link href="/shoppingcart" passHref>
          <IconButton>
            <FontAwesomeIcon icon={faShoppingCart} />
          </IconButton>
        </Link>
        <SwitchContainer className="switch">
          <SwitchInput type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
          <Slider className="slider" isDarkTheme={isDarkTheme} />
        </SwitchContainer>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
