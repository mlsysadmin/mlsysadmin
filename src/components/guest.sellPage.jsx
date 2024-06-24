import React, { useState } from "react";
import "../styles/sell.css";
import { Row, Col } from "antd";
import TopbarComponent from "./custom/TopbarComponent ";
import bannerImg from "../asset/icons/banner.png";
import { Button, Radio } from "antd";

function SellComponent() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="sell">
      <TopbarComponent />
      <div className="sell-container">
        <div className="sell-contents">
          <div className="first-content">
            <img src={bannerImg} alt="" />
            <div className="bannerbg">
              <h1>
                {" "}
                <span style={{ color: "red" }}>Sell</span> or{" "}
                <span style={{ color: "red" }}>Rent</span> <br />
                your property <br />
                at the best price
              </h1>
              <div>
                <Button id="contactUs" type="primary">
                  Contact Us
                </Button>{" "}
                <Button id="signIn" type="primary">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
          <div className="second-content">
            <h1>
              Maximize your property{"'"}s potential: Sell or Rent with
              Confidence
            </h1>
            <div className="content-container">
              <div className="content">
                <p>
                  Do you want to Sell or put your house on Rent? <br /> M
                  Lhuillier has the right solution for you. <br /> Your
                  advertisement will be viewed.
                </p>
                <Button id="ListPropertybtn" type="primary">
                  {" "}
                  List Your Property
                </Button>
              </div>
              <div>
                <Radio.Group
                  className="options"
                  onChange={onChange}
                  value={value}
                >
                  <Radio
                    style={{ fontSize: "30px", fontWeight: "lighter"}}
                    value={1}
                  >
                    Choose the right time to sell.
                  </Radio>
                  <Radio
                    style={{ fontSize: "30px", fontWeight: "lighter" }}
                    value={2}
                  >
                    Sell the right price.
                  </Radio>
                  <Radio
                    style={{ fontSize: "30px", fontWeight: "lighter" }}
                    value={3}
                  >
                    Negotiate the best offer - not just the highest offer.
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="third-content">
            <h1>How it works?</h1>
            <div className="cardContainer">
              <p>
                If you{"'"}re a non-wallet user, please visit the nearest M
                Lhuillier Branch for your listing.
              </p>
              <div className="cards">
                <div className="card1">
                  <h5>Step 1:</h5>
                  <p>Login your ML Wallet Account</p>
                </div>
                <div className="card2">
                  <h5>Step 2:</h5>
                  <p>List your Property online</p>
                </div>
                <div className="card3">
                  <h5>Step 3:</h5>
                  <p>Wait for Verification</p>
                </div>
                <div className="card4">
                  <h5>Step 4:</h5>
                  <p>Once approved, ML Agent will reach out to you.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fourth-content">
            <h1>Have questions? We{"'"}re here to help.</h1>
            <p>
              If you{"'"}re just exploring the idea of selling or buying a home,
              we{"'"}re here to talk through your options.
            </p>
            <Button id="contactUs" type="primary">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellComponent;
