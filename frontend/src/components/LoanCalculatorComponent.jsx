import React, { useState } from "react";
import "../styles/loancalculator.css";
import SliderComponent from "./custom/sliderComponent";
import Ellipse1 from "../asset/icons/Ellipse 148.png";
import Ellipse2 from "../asset/icons/Ellipse 149.png";
import Ellipse3 from "../asset/icons/Ellipse 151.png";
import { Slider, Button } from "antd";
import {
  FooterComponent,
  CustomMlFooter,
  ListingSearch,
  MainLayout,
} from "../components";

const LoanCalculatorComponent = () => {
  const [price1, setPrice1] = useState(100); // Initial price1 state set to the lowest value
  const [percentage2, setPercentage2] = useState(15); // Initial percentage2 state
  const [price2, setPrice2] = useState(800000); // Initial price2 state
  const minPrice = 100; // Minimum price
  const maxPrice = 1000; // Maximum price
  const maxPercentage = 100; // Maximum percentage

  const onPriceChange1 = (value) => {
    setPrice1(value); // Update price1 state when Slider value changes
  };

  const onPercentageChange2 = (value) => {
    setPercentage2(value); // Update percentage2 state when Slider value changes
    setPrice2((value / 100) * maxPrice); // Update price2 based on the new percentage value
  };

  const onPriceChange2 = (value) => {
    setPrice2(value); // Update price2 state when Slider value changes
  };

  const onChangeComplete = (value) => {
    console.log("onChangeComplete: ", value); // You can perform additional actions here if needed
  };

  return (
    <div>
      <div className="mort-container">
        <MainLayout />
        <div className="mort-content">
          <div className="calculator-header">
            <h1 className="title-header">Mortgage Calculator</h1>
            <p className="sub-title-header">
              Find an estimated monthly payment and explore various payment
              based on your chosen amortization duration, payment frequency or
              down payment. Find the mortgage option best for you.
            </p>
          </div>
          <div className="mort-content-1">
            <div className="first-column">
              <div className="mortgage-content">
                <div className="calc-container">
                  <span className="Label">Home price</span>
                  <p className="sub-label">
                    The amount you plan to offer for a home.
                  </p>
                  <div className="price-display">
                    <p className="price-container-1">PHP {price1}</p>
                  </div>
                  <Slider
                    value={price1}
                    min={minPrice}
                    max={maxPrice}
                    onChange={onPriceChange1}
                    onChangeComplete={onChangeComplete}
                  />
                </div>
                <div className="percentage-container">
                  <span className="Label">Down payment</span>
                  <p className="sub-label">Cash you can pay when you close.</p>
                  <div className="price-percentage-container">
                    <p className="price-container">PHP {price2}</p>
                    <p className="price-percentage">
                      {" "}
                      {percentage2.toFixed(2)}%
                    </p>
                  </div>
                  <Slider
                    value={percentage2}
                    min={0}
                    max={maxPercentage}
                    onChange={onPercentageChange2}
                    onChangeComplete={onChangeComplete}
                  />
                </div>
                <div>
                  <h3 className="payment">Where are you buying?</h3>
                  <p className="payment-desc">Enter your desired location</p>
                  <p className="input-infos">City, neighborhood, or zip code</p>
                </div>
                <div>
                  <h3 className="payment">Loan type</h3>
                  <p className="payment-desc">
                    Affects interest rates. 30 or 15 year loans are standard
                  </p>
                  <div className="year-loans">
                  <p>30-year fixed</p>
                  <p className="dropdown-btn">{">"}</p>
                  </div>
                </div>
                <div>
                  <h3 className="payment">Mortgage interest rate</h3>
                  <p className="payment-desc">
                    Varies depending on lender and credit score.
                  </p>
                  <p className="input-infos">7.123 %</p>
                </div>
              </div>
            </div>
            <div className="second-column">
              <div className="calc-range-container">
                <div className="calc-range">
                  <div className="resetbtn">
                    <Button id="Resetbtn" type="primary">
                      Reset
                    </Button>
                  </div>
                  <div className="mort-range">
                    <div>
                      <h2>PHP11,154.89 per month</h2>
                      <p className="year-percentage">30-year fixed, 7.123 %</p>
                    </div>
                    <SliderComponent />
                    <div className="interest-values">
                      <div className="interest-description">
                        <div className="interest">
                          <p>
                            <img src={Ellipse1} alt="" /> Principal and Interest
                          </p>
                        </div>
                        <div className="interest">
                          <p>
                            <img src={Ellipse2} alt="" /> Property Taxes
                          </p>
                        </div>
                        <div className="interest">
                          <p>
                            <img src={Ellipse3} alt="" /> Homeowners Insurance
                          </p>
                        </div>
                      </div>
                      <div className="value-percentage">
                        <div className="interest">
                          <p>PHP8,256.10 (80%)</p>
                        </div>
                        <div className="interest">
                          <p>PHP2,548.79 (14%)</p>
                        </div>
                        <div className="interest">
                          <p>PHP350 (5%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pre-approvedbtn">
                    <a href="/mortgage-page">
                      <Button id="pre-approvedbtn" type="primary">
                        Get pre-approved
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <br />
        <br />
        <br />
        <br />
        <CustomMlFooter />
        <FooterComponent />
      </div>
    </div>
  );
};

export default LoanCalculatorComponent;
