// src/app/profile/edit/page.js
"use client";

import React, { useState, useEffect } from 'react';
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
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent */
  padding: 3rem; /* Adjusted for larger size */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Increase the size */
  width: 100%;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem; /* Adjusted for larger spacing */
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  border-radius: 50%;
  position: relative;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Increase the font size */
  font-weight: 700;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; /* Adjusted for larger spacing */
`;

const InputField = styled.div`
  flex: 1 1 calc(50% - 1.5rem); /* Adjusted for larger spacing */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: ${({ isEdited, bgColor }) => bgColor || '#007bff'};
  color: ${({ isEdited, color }) => color || '#fff'};
  opacity: ${({ isEdited }) => isEdited ? 1 : 0.5};

  &:hover {
    opacity: 0.8;
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
  z-index: 1;
`;

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    password: '',
  });

  const [initialData, setInitialData] = useState(formData);

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(Object.values(formData).some(value => value !== ''));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <FormContainer>
          <ButtonContainer>
            <Button onClick={handleCancel} isEdited={true} bgColor="#ddd" color="#000">Cancel</Button>
            <Button isEdited={isEdited} bgColor="green">Save</Button>
          </ButtonContainer>
          <Header>
            <ProfileImage />
            <Title>Edit profile</Title>
          </Header>
          <InputContainer>
            <InputField>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label>Contact Number</Label>
              <Input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </InputField>
          </InputContainer>
        </FormContainer>
        <ImageContainer style={{ zIndex: -1 }} />
      </Content>
    </MainContainer>
  );
};

export default EditProfilePage;
