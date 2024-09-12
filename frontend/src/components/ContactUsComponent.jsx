import React from "react";
import "../styles/contactUs.css";
import map from "../asset/icons/map.png";
import logo from "../asset/icons/logo.png";
import { useState } from "react";
import { Button } from "antd";
import {
  FooterComponent,
  CustomMlFooter,
  ListingSearch,
  MainLayout,
} from "../components";
const ContactUsComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  const accordionData = [
    {
      label: "How do I begin the process of buying a home?",
      answer:
        "To begin the process of buying a home, you should first get pre-approved for a mortgage. This will give you an idea of how much home you can afford. You can then start looking at homes and working with a real estate agent to find the right property for you.",
    },
    {
      label: "What is a Mortgage, and how does it work?",
      answer:
        "A mortgage is a loan that you use to finance the purchase of a home. The lender provides the funds to buy the home, and you agree to repay the loan over a set period of time (typically 15 or 30 years) with interest. The home itself serves as collateral for the loan, meaning that if you fail to make your payments, the lender can foreclose on the property.",
    },
    {
      label: "What is a Mortgage, and how does it work?",
      answer:
        "A mortgage is a loan that you use to finance the purchase of a home. The lender provides the funds to buy the home, and you agree to repay the loan over a set period of time (typically 15 or 30 years) with interest. The home itself serves as collateral for the loan, meaning that if you fail to make your payments, the lender can foreclose on the property.",
    },
  ];
  return (
    <div>
      <div className="contactUsContainer">
        <div className="banner">
          <span className="bannerTitle">Let{"'"}s chat, Reach Out to Us</span>
          <p className="bannerSubTitle">
            Please feel free to send us your inquiry, we will revert you within
            24 hours.
          </p>
        </div>
        <div className="contact-field">
          <div className="field-container">
            <div className="inputFields">
              <div id="inputField">
                <div id="input-header">
                  <h1>Get in Touch</h1>
                  <p>You can reach us anytime</p>
                </div>
                <div className="nameField">
                  <input type="text" className="name" placeholder="First Name" />
                  <input type="text" className="name" placeholder="Last Name" />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Phone Number"
                />
                <textarea
                  name="message"
                  id="messageField"
                  placeholder="Type your message in here..."
                ></textarea>
                <Button id="messagebtn" type="primary">
                  Send Message
                </Button>
              </div>
              <div className="contactInfos">
                <div id="contactInfos">
                  <h2>Customer Support</h2>
                  <p id="customercare">customercare@mlhuillier.com</p>
                  <div className="phone-num">
                    <div>
                      <p>0947-999-0337 </p>
                      <p>0947-999-2472 </p>
                      <p>0947-999-2721</p>
                    </div>
                    <div>
                      <p>0947-999-0522</p>
                      <p>0917-871-2973</p>
                    </div>
                  </div>
                  <div id="foreignContact">
                    <h4>USA</h4>
                    <p>1-877-688-4588</p>
                  </div>
                </div>
                <div id="others">
                  <p>
                    <span style={{ fontWeight: "bold" }}>Opening Hours:</span>{" "}
                    <span style={{ fontWeight: "bold", color: "red  " }}>
                      8AM - 5PM
                    </span>{" "}
                    Everyday{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contactUsContent">
          <div className="location">
            <p className="location-header">Our Location</p>
            <div className="location-container">
              <h3 id="location">Connecting Near and Far</h3>
              <p className="pinned-location">
                M Lhuillier Financial Services Inc. <br /> B. Benedicto St, Cebu
                City,
                <br />
                6000 Cebu
              </p>
            </div>
          </div>
          <div className="map">
            <div className="pinned">
              <p>
                {" "}
                <img src={logo} alt="" /> M Lhuillier Financial <br />
                Services Inc.
              </p>
              <p>Main Office</p>
            </div>
            <img src={map} id="map" alt="" />
          </div>
        </div>
        <div className="FAQs-container">
          <div className="questions">
            {accordionData.map((item, index) => (
              <div key={index}>
                <div
                  className="dropdown-label"
                  onClick={() => toggleAccordion(index)}
                  style={{
                    backgroundColor:
                      activeIndex === index ? "white" : "white",
                    display: activeIndex === index ? "flex" : "flex",
                    flexDirection: activeIndex === index ? "column" : "row",
                    padding: "16px",
                  }}
                >
                  {item.label}
                  {activeIndex === index && (
                    <div
                      className="dropdown-content"
                      style={{ height: "auto", fontWeight:'lighter' }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="FAQs">
            <div id="FAQs">
              <p>FAQ</p>
            </div>
            <div id="questions">
              <h2>
                Do you have any <br />
                questions for us?
              </h2>
            </div>
            <div id="sub-info">
              <p>
                If there are question you want to ask.
                <br /> We will answer all your question.
              </p>
            </div>
            <div className="FAQs-field">
              <input
                type="text"
                className="FAQs-email"
                placeholder="Email Address"
              />
              <Button id="submitbtn" type="primary">
                Submit
              </Button>
            </div>
          </div>
        </div>
        <CustomMlFooter />
        <FooterComponent />
      </div>
    </div>
  );
};


export default ContactUsComponent;



