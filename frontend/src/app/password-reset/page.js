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

const ForgotPasswordContainer = styled.div`
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

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
    const [showErrorPopUp, setShowErrorPopUp] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/account/request-password-reset', {
                email,
            });

            if (response.status === 200) {
                console.log('Password reset email sent successfully!');
                setShowSuccessPopUp(true);
                setTimeout(() => setShowSuccessPopUp(false), 3000); // Hide success pop-up after 3 seconds
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setShowErrorPopUp(true);
            setTimeout(() => setShowErrorPopUp(false), 3000); // Hide error pop-up after 3 seconds
        }
    };

    return (
        <MainContainer>
            <Content>
                <ForgotPasswordContainer>
                    <FormContainer>
                        <Header>
                            <Logo src="/logo.png" alt="Logo" />
                            <div>E-Commerce for Plastic Manufacturing</div>
                        </Header>
                        <Title>Forgot Password</Title>
                        <Description>Enter your email to reset your password.</Description>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <Input type="email" id="email" name="email" value={email} onChange={handleChange} required />
                            <Button type="submit">Send Reset Link</Button>
                        </form>
                    </FormContainer>
                    <ImageContainer />
                </ForgotPasswordContainer>
            </Content>
            {showSuccessPopUp && <PopUp $type="success">Password reset email sent successfully!</PopUp>}
            {showErrorPopUp && <PopUp $type="error">Failed to send password reset email. Please try again.</PopUp>}
        </MainContainer>
    );
};

export default ForgotPasswordPage;
