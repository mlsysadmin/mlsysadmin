import React, { useState } from "react";
import "../styles/MortgageCalculator.css";
import SliderComponent from "./custom/sliderComponent";
import Ellipse1 from "../asset/icons/Ellipse 148.png";
import Ellipse2 from "../asset/icons/Ellipse 149.png";
import Ellipse3 from "../asset/icons/Ellipse 151.png";
import { Slider, Button } from "antd";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout } from "../components";

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
      <div className="mortContainer">
        <MainLayout />
        <div className="mort-content">
          <div className="calculator-header">
            <h1 className="titleHeader">Mortgage Calculator</h1>
            <p className="subTitleHeader">
              Find an estimated monthly payment and explore various payment based on
              your chosen amortization duration, payment frequency or down payment.
              Find the mortgage option best for you.
            </p>
          </div>
          <div className="mort-content-1">
            <div className="first-column">
              <div className="mortgageContent">
                <div className="calcContainer">
                  <span className="Label">Home price</span>
                  <p className="subLabel">
                    The amount you plan to offer for a home.
                  </p>
                  <div className="priceDisplay">
                    <p className="container">PHP {price1}</p>
                  </div>
                  <Slider
                    value={price1}
                    min={minPrice}
                    max={maxPrice}
                    onChange={onPriceChange1}
                    onChangeComplete={onChangeComplete}
                  />
                </div>
                <div className="percentageContainer">
                  <span className="Label">Down payment</span>
                  <p className="subLabel">Cash you can pay when you close.</p>
                  <p className="container">PHP {price2}</p>
                  <p>Percentage: {percentage2.toFixed(2)}%</p>
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
                  <p className="paymentDesc">Enter your desired location</p>
                  <p className="inputInfos">City, neighborhood, or zip code</p>
                </div>
                <div>
                  <h3 className="payment">Loan type</h3>
                  <p className="paymentDesc">
                    Affects interest rates. 30 or 15 year loans are standard
                  </p>
                  <p className="inputInfos">30-year fixed</p>
                </div>
                <div>
                  <h3 className="payment">Mortgage interest rate</h3>
                  <p className="paymentDesc">
                    Varies depending on lender and credit score.
                  </p>
                  <p className="inputInfos">7.123 %</p>
                </div>
              </div>
            </div>
            <div className="second-column">
              <div className="calcRangeContainer">
                <div className="calcRange">
                  <div className="resetbtn">
                    <Button id="Resetbtn" type="primary">
                      Reset
                    </Button>
                  </div>
                  <div className="mortRange">
                    <div>
                      <span>PHP11,154.89 per month</span>
                      <span>30-year fixed, 7.123 %</span>
                    </div>
                    <SliderComponent />
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
                  <div className="preApprovedbtn">
                    <a href="/mortgage-page">
                      <Button id="PreApprovedbtn" type="primary">
                        Get pre-approved
                      </Button>
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <br /><br /><br /><br />
        <CustomMlFooter />
        <FooterComponent />
      </div>
    </div>
  );
}

export default LoanCalculatorComponent;
