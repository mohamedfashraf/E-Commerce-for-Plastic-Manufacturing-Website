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
  background-color: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px; /* Increase max-width */
  width: 100%;
  height: 100%;
  min-height: 90vh;  /* Allow more height */
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
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
  font-size: 2.5rem;
  font-weight: 700;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const InputField = styled.div`
  flex: 1 1 calc(50% - 1.5rem);
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
  opacity: ${({ isEdited }) => (isEdited ? 1 : 0.5)};

  &:hover {
    opacity: 0.8;
  }
`;

const AddressContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const AddressTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const AddressItem = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const AddressDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
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
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchShippingAddresses();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/account/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setFormData(data);
      } else {
        throw new Error(data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const fetchShippingAddresses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/addresses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Fetched addresses:", data);
        setShippingAddresses(data);
      } else {
        throw new Error(data.message || "Failed to fetch shipping addresses");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setShippingAddresses((prev) => {
      const newAddresses = [...prev];
      newAddresses[index] = { ...newAddresses[index], [name]: value };
      return newAddresses;
    });
    setIsEdited(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
        setIsEdited(false);
      } else {
        throw new Error(data.message || "Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSaveAddress = async (index) => {
    try {
      const token = localStorage.getItem("accessToken");
      const address = shippingAddresses[index];
      const response = await fetch(
        "http://localhost:8000/account/user-info/update-address",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(address),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses((prev) =>
          prev.map((addr, idx) => (idx === index ? address : addr))
        );
      } else {
        throw new Error(data.message || "Failed to update shipping address");
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/account/user-info/delete-address",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ _id: addressId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShippingAddresses((prev) =>
          prev.filter((addr) => addr._id !== addressId)
        );
      } else {
        throw new Error(data.message || "Failed to delete shipping address");
      }
    } catch (error) {
      console.error("Error deleting shipping address:", error);
    }
  };

  const handleCancel = () => {
    fetchUserProfile();
    fetchShippingAddresses();
    setIsEditing(false);
    setIsEdited(false);
  };

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <FormContainer>
          <ButtonContainer>
            <Button onClick={handleCancel} isEdited={true} bgColor="#ddd" color="#000">Cancel</Button>
            <Button onClick={handleSave} isEdited={isEdited} bgColor="green">Save</Button>
          </ButtonContainer>
          <Header>
            <ProfileImage />
            <Title>Edit Profile</Title>
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
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </InputField>
          </InputContainer>
          <AddressContainer>
            <AddressTitle>Shipping Addresses</AddressTitle>
            {shippingAddresses.map((address, index) => (
              <AddressItem key={index}>
                <AddressDetails>
                  <InputField>
                    <Label>Street</Label>
                    <Input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                  <InputField>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                  <InputField>
                    <Label>State</Label>
                    <Input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                  <InputField>
                    <Label>Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                  <InputField>
                    <Label>Country</Label> {/* New Field */}
                    <Input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                  <InputField>
                    <Label>Phone Number</Label> {/* New Field */}
                    <Input
                      type="text"
                      name="addressPhoneNumber"
                      value={address.addressPhoneNumber}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </InputField>
                </AddressDetails>
                <ButtonContainer>
                  <Button onClick={() => handleSaveAddress(index)} isEdited={true} bgColor="#007bff" color="#fff">Save</Button>
                  <Button onClick={() => handleDeleteAddress(address._id)} isEdited={true} bgColor="#dc3545" color="#fff">Delete</Button>
                </ButtonContainer>
              </AddressItem>
            ))}
          </AddressContainer>
        </FormContainer>
        <ImageContainer style={{ zIndex: -1 }} />
      </Content>
    </MainContainer>
  );

}

export default EditProfilePage;
