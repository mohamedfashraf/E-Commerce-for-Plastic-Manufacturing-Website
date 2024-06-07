"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar'; // Adjust the path to your Navbar component

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f8f8;
  color: #000;
  position: relative;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3; /* Ensure this is above the ImageContainer and Container */
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 80px auto;
  z-index: 2; /* Ensure this is above the ImageContainer */
`;

const CustomizeOrderSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CustomizationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #e0f7e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Customization = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #38b2ac;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #319795;
  }
`;

const ExplorePresetsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PresetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const PresetItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const PresetImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PresetText = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
`;

const PresetDescription = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px;
  background-color: #38b2ac;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #319795;
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

const CustomizePage = ({ presets = [] }) => {
    return (
        <MainContainer>
            <NavbarContainer>
                <Navbar /> {/* Add Navbar here */}
            </NavbarContainer>
            <ImageContainer />
            <Container>
                <CustomizeOrderSection>
                    <SectionTitle>Customize Your Order</SectionTitle>
                    <CustomizationContainer>
                        <Customization>
                            <Label htmlFor="primary-color">Primary color</Label>
                            <Input type="color" id="primary-color" defaultValue="#000000" />
                            <Label htmlFor="material">Material</Label>
                            <Input type="text" id="material" placeholder="Material" />
                            <Label htmlFor="dimensions">Dimensions</Label>
                            <Input type="text" id="dimensions" placeholder="W x H x L" />
                            <Button>Confirm</Button>
                        </Customization>
                    </CustomizationContainer>
                </CustomizeOrderSection>
                <ExplorePresetsSection>
                    <SectionTitle>Explore Our Presets</SectionTitle>
                    <PresetsContainer>
                        {presets.map((preset, index) => (
                            <PresetItem key={index}>
                                <PresetImage src={preset.image} alt={preset.name} />
                                <PresetText>${preset.price}</PresetText>
                                <PresetDescription>{preset.description}</PresetDescription>
                                <Button>ADD</Button>
                            </PresetItem>
                        ))}
                    </PresetsContainer>
                    <Pagination>
                        <PaginationButton disabled>&lt;</PaginationButton>
                        <span>1</span>
                        <PaginationButton>&gt;</PaginationButton>
                    </Pagination>
                </ExplorePresetsSection>
            </Container>
        </MainContainer>
    );
};

export default CustomizePage;
