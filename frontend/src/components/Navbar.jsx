// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from "../assets/red-ml-logo.png";

// Logo
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 2rem;
  margin-right: 0.5rem;
  
`;

const Logo = () => {
  return (
    <LogoLink to="/">
      <LogoImage src={logoImage} alt="M & L HUILLIER" />
      M & L HUILLIER
    </LogoLink>
  );
};

// ListButton
const Button = styled(Link)`
background-color: #D90000;
color: #ffff;
padding: 1rem;
height: 21px;
width: 146px;
font-size: 1rem;
text-decoration: none;
border-radius: 30px;
display: flex;
justify-content: center;
align-items: center;
`;
const ListButton = () => {
  return <Button to="/list-property">List your Property</Button>;
};

const UserButton = () => {
  return <Button to="/user-profile">Maria</Button>;
}

// NavLinks
const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #8C9094;
    text-decoration: none;
    font-size: 1rem;
  }
`;

const NavLinks = () => {
  return (
    <LinksContainer>
      <Link to="/sell">Sell</Link>
      <Link to="/new">New</Link>
      <Link to="/rent">Rent</Link>
      <Link to="/buy">Buy</Link>
      <Link to="/home-loan">Home Loan</Link>
      <Link to="/home-insurance">Home Insurance</Link>
      <Link to="/other-services">Other Services</Link>
      <Link to="/contact">Contact</Link>
    </LinksContainer>
  );
};

// Navbar
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-right: 1rem;
`;



const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <NavLinks />
      <ListButton />
      <UserButton/>
    </NavbarContainer>
  );
};

export default Navbar;