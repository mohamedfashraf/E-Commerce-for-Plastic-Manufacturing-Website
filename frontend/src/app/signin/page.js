"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--main-bg-color);
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

const SignInContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 40%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: grey;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ $bgColor }) => $bgColor || '#007bff'};
  color: ${({ $color }) => $color || '#fff'};
  border: ${({ $border }) => $border || 'none'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor || '#0056b3'};
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ccc;
  }

  &::before {
    margin-right: 0.75rem;
  }

  &::after {
    margin-left: 0.75rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background: url('/maxhines.png') no-repeat center center;
  background-size: cover;
`;

const PopUp = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  background-color: ${({ $type }) => ($type === 'success' ? '#28a745' : '#dc3545')};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:8000/account/sign-in', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Sign in successful!');
        const userDetails = response.data.userDetails;
        if (userDetails) {
          console.log('User Name:', userDetails.firstName);
        }
        setShowSuccessPopUp(true);
        setTimeout(() => {
          setShowSuccessPopUp(false);
          // Redirect to the /home page after successful sign-in
          window.location.href = 'http://localhost:3000/home';
        }, 3000); // Hide success pop-up after 3 seconds
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setShowErrorPopUp(true);
      setTimeout(() => setShowErrorPopUp(false), 3000); // Hide error pop-up after 3 seconds
    }
  };

  return (
    <MainContainer>
      <Content>
        <SignInContainer>
          <FormContainer>
            <Header>
              <Logo src="/logo.png" alt="Logo" />
              <div>E-Commerce for Plastic Manufacturing</div>
            </Header>
            <Title>Sign in</Title>
            <Description>Please login to continue to your account.</Description>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
              <label htmlFor="password">Password</label>
              <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              <Button type="submit">Sign in</Button>
              <Divider>or</Divider>
              <Button $bgColor="#fff" $color="#4285F4" $border="1px solid #ccc" $hoverColor="#f0f0f0">
                <img src="/google.png" alt="Google" />
                Sign in with Google
              </Button>
              <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                <a href="/password-reset" style={{ color: '#007bff', textDecoration: 'underline' }}>Forgot Password?</a>
              </p>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>Need an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>Create one</a></p>
          </FormContainer>
          <ImageContainer />
        </SignInContainer>
      </Content>
      {showSuccessPopUp && <PopUp $type="success">Sign in successful!</PopUp>}
      {showErrorPopUp && <PopUp $type="error">Sign in failed. Please check your credentials and try again.</PopUp>}
    </MainContainer>
  );
};

export default SignInPage;
