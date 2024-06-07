import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImage from "../assets/red-ml-logo.png";
import appstore from "../assets/appstore.png";
import googleplay from "../assets/googleplay.png";
import appgallery from "../assets/appgallery.png";

const FooterContainer = styled.footer`
  background: linear-gradient(180deg in oklab, #FFEDED, white);
  color: #333; /* Changed to a darker color for better contrast */
  padding: 40px 0;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: row;
  margin-top:5%;
`;

const FooterWrapper = styled.div`
width:100%;
  display: flex;
  flex-direction:row;
  gap:8rem;
  padding:1% 1% 1% 5%;
`;

const FooterSection = styled.div`
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-basis: 50%;
    margin-bottom: 30px;
  }

  &:last-child {
    text-align: right;
  }
`;

const DownloadLinks = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 0;

    &:last-child {
      margin-bottom: 0;
    }

    img {
      max-width: 120px;
    }
  }
`;
const FooterHeader = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ed1c24;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  color: gray;

  li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    a {
      color: gray;
      text-decoration: none;
      font-weight: bold;
      flex-grow: 1;

      &:hover {
        color: #ccc;
      }

      img {
        margin-left: auto;
        width: 20%;
      }
    }
  }
`;
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 20px;
    margin: 0 10px;

    &:hover {
      color: #ccc;
    }
  }
`;

const ContactSection = styled(FooterSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
  margin-bottom:80px;

  img {
    max-width: 50%;
  }

  p {
    margin: 10px 0;
  }

  a {
    color: red;
  }
`;
const NewFooterContainer = styled.footer`
  background-color: red;
  padding: 10px 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
`;

const CopyrightText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const LegalLinks = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  width:15%;
  gap:1rem;
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      color: #ccc;
    }
  }
`;
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <ContactSection>
            <img src={logoImage} alt="ML Huillier Logo" />
            <p>customercare@mlhuillier.com</p>
            <SocialIcons>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </SocialIcons>
          </ContactSection>
          <FooterSection>
            <FooterHeader>Quick Links</FooterHeader>
            <FooterList>
              <li>
                <a href="#">Online Services</a>
              </li>
              <li>
                <a href="#">Products & Services</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </FooterList>
          </FooterSection>
          <FooterSection>
            <FooterHeader>Support</FooterHeader>
            <FooterList>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy Notice</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
            </FooterList>
          </FooterSection>
          <FooterSection>
            <DownloadLinks>
              <FooterHeader>Download</FooterHeader>
              <a href="#">
                <img src={appstore} alt="Download on the App Store" />
              </a>
              <a href="#">
                <img src={googleplay} alt="Get it on Google Play" />
              </a>
              <a href="#">
                <img src={appgallery} alt="Explore it on AppGallery" />
              </a>
            </DownloadLinks>
          </FooterSection>
        </FooterWrapper>
      </FooterContainer>

      <NewFooterContainer>
        <CopyrightText>
          Copyright © 2024 ML Huillier Financial Services, Inc. All Rights
          Reserved.
        </CopyrightText>
        <LegalLinks>
          <a href="#">About Us</a>
          <a href="#">Privacy Notice</a>
        </LegalLinks>
      </NewFooterContainer>
    </>
  );
};

export default Footer;
