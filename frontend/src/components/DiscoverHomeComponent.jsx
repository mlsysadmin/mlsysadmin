import React from "react";
import { useState } from "react";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import MainLayout from "./layout/layout.component";
import { Slider, Progress, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import homeicon from "../asset/icons/homeicon.png";
import dollaricon from "../asset/icons/dollar-icon.png";
import "../styles/discoverhome.css";

const DiscoverHomeComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [HomepriceRange, setHomePriceRange] = useState([100000]);
  const [DppriceRange, setDpHomePriceRange] = useState([100000]);
  const [interestRate, setInterestRate] = useState(0);

  const handleHomePriceRangeChange = (values) => {
    setHomePriceRange(values);
  };
  const handleDpPriceRange = (values) => {
    setDpHomePriceRange(values);
  };
  const handleInterestRateChange = (values) => {
    setInterestRate(values);
  };
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const accordionData = [
    {
      label: "How much do you need to put down on a house?",
      answer:
        "The down payment required for a house can vary, but typically it ranges from 3% to 20% of the home's purchase price. The exact amount you'll need to put down depends on the type of mortgage loan you're getting and your financial situation.",
    },
    {
      label: "How do I choose a mortgage lender?",
      answer:
        "When choosing a mortgage lender, you should consider factors like interest rates, fees, customer service, and the lender's reputation. It's a good idea to shop around and compare offers from multiple lenders to find the best fit for your needs.",
    },
    {
      label: "How much mortgage can I afford?",
      answer:
        "The amount of mortgage you can afford depends on your income, debts, credit score, and other financial factors. Lenders typically recommend that your monthly mortgage payment, including taxes and insurance, should not exceed 28% of your gross monthly income.",
    },
    {
      label: "What is mortgage pre-qualification?",
      answer:
        "Mortgage pre-qualification is the process of getting an estimate of the loan amount you may be able to qualify for based on your financial information. This can help you understand your budget and bargaining power when shopping for a home.",
    },
    {
      label: "How do I qualify to buy a home?",
      answer:
        "To qualify to buy a home, you typically need a stable income, a good credit score, and a down payment. Lenders will also consider your debt-to-income ratio, employment history, and assets when determining your eligibility for a mortgage loan.",
    },
  ];
  return (
    <div className="discover-home-container">
      <div className="discover-home">
        <div className="discover-home-content">
          <div className="discover-overlap">
            <div className="disc-content-container">
              <div className="discover-words">
                <span className="smart-way-to-get-a">Smart way to get a</span>
                <span className="home-loan"> Home Loan</span>
                <span className="discover-tagline">
                  Home financing to make your goals reality.
                </span>
              </div>
              <div className="discover-upper-btn">
                <div className="refinance-a-home">
                  <div className="refinance-btn">
                    <a href="/refinance">
                      <span>Refinance a Home</span>
                    </a>
                  </div>
                </div>
                <div className="buy-a-home">
                  <div className="buy-home-text">
                    <a href="/buy-a-home">
                      <span>Buy a Home</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mortgageexp">
          <div className="mortgage-cont">
            <span className="mortgage-title">
              A new kind of mortgage experience
            </span>
            <div className="mortgage-slide-group">
              <div className="mortgage-slide">
                <div className="ms1-group">
                  <span className="ms1-title">Easy Payment</span>
                  <span className="ms1-text">
                    Making mortgage payments easier often involves exploring
                    various options and strategies.
                  </span>
                </div>
                <div className="ms2-group">
                  <span className="ms2-title">Apply online with ease</span>
                  <span className="ms2-text">
                    Securely import documents from thousands of financial
                    institutions in a few clicks.
                  </span>
                </div>
                <div className="ms3-group">
                  <span className="ms3-title">Get one-on-one support</span>
                  <span className="ms3-text">
                    You’ll get support and regular updates from a dedicated
                    Mortgage Consultant.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mortgage-calc">
        <div className="mortgage-calc-cont">
          <div className="mortgage-cont1">
            <div className="mortrange">
              <div className="mortgage-title-mort">Mortgage Calculator</div>
              <div className="range-group">
                <div className="home-price-frame">
                  <div className="home-price-frame-title">Home price</div>
                  <div className="home-price-frame-cont">
                    <div className="home-price-price-range">
                      <span className="amount-value">PHP </span>
                      <span className="amount">{HomepriceRange}</span>
                    </div>
                    <Slider
                      range
                      min={100000}
                      max={1000000}
                      step={100}
                      value={HomepriceRange}
                      onChange={handleHomePriceRangeChange}
                    />
                    {/* <div className="ellipse" /> */}
                  </div>
                </div>
                <div className="loan-term-frame">
                  <div className="loan-term-frame-title">Loan Term</div>
                  <div className="loan-term-frame-cont">
                    <div className="loan-term-value">30 Years Fixed</div>
                    <img
                      className="calculator-shop"
                      alt="Calculator shop"
                      src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/calculator-2--shop-shopping-pay-payment-store-cash-calculate-mat@2x.png"
                    />
                    {/* <img
                                            className="vector"
                                            alt="Vector"
                                            src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/vector-9.svg"
                                        /> */}
                  </div>
                </div>
                <div className="down-payment-frame">
                  <div className="down-payment-title">Down payment</div>
                  <div className="down-payment-frame-cont">
                    <div className="downpayment-amount">
                      <span className="amount-value">PHP </span>
                      <span className="downpayment-amount">{DppriceRange}</span>
                      <Slider
                        range
                        min={100000}
                        max={1000000}
                        step={100}
                        value={DppriceRange}
                        onChange={handleDpPriceRange}
                      />
                    </div>
                  </div>
                </div>
                <div className="interest-rate-frame">
                  <div className="interest-rate-frame-title">Interest Rate</div>
                  <div className="interest-rate-frame-cont">
                    <div className="interest-rate-value">{interestRate} % </div>
                    <Slider
                      range
                      min={0}
                      max={100}
                      step={1}
                      value={interestRate}
                      onChange={handleInterestRateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mortgage-btn-group">
              <div className="compute-mortgage">
                <span>Compute Mortgage</span>
              </div>
              <div className="getpre-approvedbtn">
                <span className="text-wrapper">
                  <a
                    href="/mortgage"
                    style={{ textDecoration: "none", color: "#ff2800" }}
                  >
                    Get pre-approved
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* right-side */}

          <div className="mortlabel">
            <div className="mortlabel-cont">
              <span className="label-title">Monthly payment breakdown</span>
              <div className="per-range">
                <div className="interest-group-label">
                  <Progress
                    type="circle"
                    percent={85}
                    width={200}
                    strokeWidth={10}
                    strokeColor="#ff2800"
                    trailColor="#d900002b"
                    format={(percent) => (
                      <div
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                        className="montly-pay-cal"
                      >
                        PHP 200 <br />
                        per month
                      </div>
                    )}
                    gapDegree={10}
                    gapPosition="bottom"
                  />
                </div>
                <div className="principal">
                  <div className="content-info-mortgage">
                    <div className="payment-breakdown">
                      <div
                        className="radio-circle"
                        style={{ backgroundColor: "rgba(140, 144, 148, 0.62)" }}
                      />
                      <span>10% down payment</span>
                    </div>
                    <div className="payment-breakdown">
                      <div
                        className="radio-circle"
                        style={{ backgroundColor: "#8C9094" }}
                      />
                      <span>30 years fixed</span>
                    </div>
                    <div className="payment-breakdown">
                      <div
                        className="radio-circle"
                        style={{ backgroundColor: "#D90000" }}
                      />
                      <span>Principal&nbsp;&nbsp;XXX,XXX</span>
                    </div>
                    <div className="payment-breakdown">
                      <div
                        className="radio-circle"
                        style={{ backgroundColor: "#F9C7C7" }}
                      />
                      <span> Interest&nbsp;&nbsp;XXXX</span>
                    </div>
                  </div>
                  <div className="lower-monthly-payment">
                    <span className="pan">Principle and Interest</span>
                    <div className="line-principal-group">
                      <img
                        className="line-3"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/line-31.svg"
                      />
                      <div className="monthly-amount">PHP200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dn-component">
        <div className="component4-header">
          <h1>Get pre-approved</h1>
          <span className="home-tagline">
            Home financing to make your goals a reality.
          </span>
        </div>
        <div className="content-4">
          <div className="purchase">
            <div className="overlap-group">
              <img src={homeicon} alt="home" />
              <span className="span">I want to purchase a home.</span>
            </div>
          </div>
          <div className="refinance">
            <div className="overlap-group">
              <img src={dollaricon} alt="dollar" />
              <span className="span">I want to refinance my home </span>
            </div>
          </div>
        </div>
      </div>
      <div className="faqs-container">
        <div className="faqs-content">
          <h2>Most-asked morgage questions</h2>
          <div className="discover-questions">
            {accordionData.map((item, index) => (
              <div key={index}>
                <div
                  className="dropdown-label"
                  onClick={() => toggleAccordion(index)}
                  style={{
                    backgroundColor:
                      activeIndex === index ? "#ffffff" : "white",
                    color: activeIndex === index? "#ff2800":"#444444",
                    display:activeIndex === index? "flex": "flex",
                    flexDirection:activeIndex === index? "column": "row",
                  }}
                >
                  {item.label}
                  <DownOutlined
                    style={{
                      color: "#ff2800",
                      transform:
                        activeIndex === index ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  {activeIndex === index && (
                  <div className="dropdown-content" style={{ height: "auto" }}>
                    {item.answer}
                  </div>
                )}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomMlFooter />
      <FooterComponent />
    </div>
  );
};
export default DiscoverHomeComponent;
