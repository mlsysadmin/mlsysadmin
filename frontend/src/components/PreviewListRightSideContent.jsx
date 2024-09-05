import React, { useState, useEffect } from "react";
import { Flex, Progress, Slider, message, Button, Menu, Dropdown } from "antd";
import ApplicationDetailModal from "./layout/ApplicationDetails/ApplicationDetailsModal";
import iconcalcu from "../assets/icons/previewlisting/calculatorsign.png";
import icondollar from "../assets/icons/previewlisting/dollarcoin.png";
import mail from "../assets/icons/previewlisting/mailenvelope.png";
import user from "../assets/icons/previewlisting/usercircle.png";
import chat from "../assets/icons/previewlisting/chatmessages.png";
import call from "../assets/icons/previewlisting/callphone.png";
import "../styles/previewListing.css";
import { GetAllPublicListing } from "../api/GetAllPublicListings";
import { GetPhotoFromDB } from "../utils/GetPhoto";

const PreviewListRightSideContent = () => {

  const [homePrice, setHomePrice] = useState(500000); // Set default value
  const [downPayment, setDownPayment] = useState(100000); // Set default value
  const [term, setTerm] = useState(30); // State for term
  const [stepsGap, setStepsGap] = useState(3); // Assume 3% as default interest rate

  const termInMonths = term * 12; // Convert term to months

  // Calculate total home price with interest
  const totalHomePrice = homePrice + homePrice * (stepsGap / 100);

  // Calculate monthly payment
  const monthlyPayment = (totalHomePrice - downPayment) / termInMonths

  const [showApplicationDetailModal, setShowApplicationDetailModal] =
    useState(false);

  const handleButtonClick = () => {
    console.log("Button clicked, showing modal");
    setShowApplicationDetailModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowApplicationDetailModal(false);
  };

  const [publiclisting, setPublicListing] = useState([]);

  const allPublicListing = async () => {
    const res = await GetAllPublicListing();
    const dataresp = res.data;
    setPublicListing(dataresp);
    console.log("public listing:", dataresp);
  };

  useEffect(() => {
    allPublicListing();
  }, []);

  const all = publiclisting.map((data) =>
    GetPhotoFromDB(data.listings.photos.photo)
  );

  console.log("this is all", all);
  const [index, setIndex] = useState(0);

  const secImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % publiclisting.length);
  };

  const firstImage = () => {
    setIndex((prevIndex) =>
      prevIndex - 1 < 0 ? publiclisting.length - 1 : prevIndex - 1
    );
  };

  // Dropdown menu items for term selection
  const menu = (
    <Menu onClick={(e) => setTerm(parseInt(e.key))}>
      <Menu.Item key="30">30 Years Fixed</Menu.Item>
      <Menu.Item key="25">25 Years Fixed</Menu.Item>
      <Menu.Item key="20">20 Years Fixed</Menu.Item>
      <Menu.Item key="15">15 Years Fixed</Menu.Item>
      <Menu.Item key="10">10 Years Fixed</Menu.Item>
      <Menu.Item key="5">5 Years Fixed</Menu.Item>
    </Menu>
  );

  return (
    <div className="right-side-container">
       <div className="calculator">
      <h2>Calculator</h2>
      <div className="calc">
        <div className="calculatorLeft">
          <div className="calculator-input">
            <label>Term</label>
            <div className="calculator-field-term">
              <img
                src={iconcalcu}
                alt="Iconcalcu"
                style={{
                  height: "15px",
                  width: "15px",
                  margin: "10px",
                  color: "black",
                }}
              />
              <Dropdown overlay={menu} trigger={["click", "hover"]}>
                <span style={{ cursor: "pointer" }}>{term} Years Fixed</span>
              </Dropdown>
            </div>
          </div>
          <div className="calculator-input">
            <label>Interest</label>
            <div className="calculator-field">
              <img
                src={icondollar}
                alt="Icondollar"
                style={{
                  height: "15px",
                  width: "15px",
                  margin: "10px",
                  marginBottom: "30px",
                }}
              />
              <div className="slider-container">
                <div className="slider-value">{stepsGap}%</div>
                <Slider
                  step={1}
                  min={1}
                  max={100}
                  value={stepsGap}
                  onChange={setStepsGap}
                  trackStyle={{ backgroundColor: "black" }}
                  handleStyle={{
                    borderColor: "black",
                    backgroundColor: "black",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="calculator-input">
            <label>Home Price</label>
            <div className="calculator-field">
              <img
                src={icondollar}
                alt="Icondollar"
                style={{
                  height: "15px",
                  width: "15px",
                  margin: "10px",
                  marginBottom: "30px",
                }}
              />
              <div className="slider-container">
                <div className="slider-value">
                  PHP {homePrice.toLocaleString()}
                </div>
                <Slider
                  step={10000}
                  min={500000}
                  max={10000000}
                  value={homePrice}
                  onChange={setHomePrice}
                  trackStyle={{ backgroundColor: "black" }}
                  handleStyle={{
                    borderColor: "red",
                    backgroundColor: "red",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="calculator-input">
            <label>Down Payment</label>
            <div className="calculator-field">
              <img
                src={icondollar}
                alt="Icondollar"
                style={{
                  height: "15px",
                  width: "15px",
                  margin: "10px",
                  marginBottom: "30px",
                }}
              />
              <div className="slider-container">
                <div className="slider-value">
                  PHP {downPayment.toLocaleString()}
                </div>
                <Slider
                  step={5000}
                  min={100000}
                  max={homePrice}
                  value={downPayment}
                  onChange={setDownPayment}
                  trackStyle={{ backgroundColor: "black" }}
                  handleStyle={{
                    borderColor: "black",
                    backgroundColor: "black",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="calculatorRight">
          <div className="int">
            <b>{term}</b>
            <p>Years Fixed</p>
          </div>
          <div className="exp">
            <b>{stepsGap}%</b>
            <p>Interest</p>
          </div>
          <Progress
            type="circle"
            percent={100}
            format={() => (
              <div>
                <div className="pesos">PHP {monthlyPayment.toFixed(2)}</div>
                <div className="per-month">per month</div>
              </div>
            )}
            strokeColor="#D90000"
          />
          <div className="calculator-result">
            <p className="pi">Principle and Interest</p>
            <div className="result-amount">
              <span className="red-bar"></span>
              PHP {monthlyPayment.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <button className="apply-button" onClick={() => alert("Application Submitted!")}>
        APPLY NOW
      </button>
    </div>

      <div className="contact-us">
        <h2>Contact Us</h2>
        <div className="contact-input">
          <img src={user} alt="User" />
          <input type="text" placeholder="Name" />
        </div>
        <div className="contact-input">
          <img src={mail} alt="Mail" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="contact-input">
          <img src={call} alt="Call" />
          <input type="tel" placeholder="Phone Number" />
        </div>
        <div className="contact-textarea">
          <img src={chat} alt="Chat" />
          <textarea placeholder="I am interested in 5 Bedroom House for Rent in Maria Luisa Park"></textarea>
        </div>
        <button className="send-message-button">Send Message</button>
      </div>
    </div>
  );
};

export default PreviewListRightSideContent;
