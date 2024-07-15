import React, { useState, useEffect, useRef } from "react";
import MainLayout from "./layout/layout.component";
import SubmitApplicationCustom from "./custom/application/submitapplication.custom";
import { Steps, Menu, Dropdown, Slider } from "antd";
import "../styles/refinance.css";
import FooterComponent from "./layout/FooterComponent";
import WrapUpDetails from "./custom/application/wrapup.custom";
import CustomMlFooter from "./custom/Custom.Mlfooter";

const RefinanceComponent = () => {
  const { Step } = Steps;
  const [selectedButton, setSelectedButton] = useState(null);
  const [current, setCurrent] = useState(0);
  const loanGroupRef = useRef(null);
  const PropertyGroupRef = useRef(null);
  const DetailsGroupRef = useRef(null);
  const WrapUpGroupRef = useRef(null);

  //property
  const [refPropquest1, setRefPropQuest1] = useState("");
  const [refPropquest2, setRefPropQuest2] = useState("");
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
  const [selectedbtnprop, setsSelectedbtnprop] = useState("");
  const [refinanceAmount, setRefinanceAmount] = useState(0);
  //handler
  const handleRefPropQuest1 = (option) => {
    setRefPropQuest1(option);
  };
  const handleRefPropQuest2 = (option) => {
    setRefPropQuest2(option);
  };
  const handleRefinanceAmountChange = (value) => {
    setRefinanceAmount(value);
  };
  const handleDropdownButtonClick = (event) => {
    setSelectedButton(event.target.textContent);
  };
  const handlefourthquestprop = (option) => {
    setsSelectedbtnprop(option);
  };

  //details
  const [empStatus, setEmplStatus] = useState("");
  const [annualInc, setAnnualInc] = useState("");
  const [bankcruptcyStat, setBankcruptcyStat] = useState("");
  const [mortpayments, setMortPayments] = useState("");
  const [creditscore, setCreditScore] = useState("");

  const handleEmploymentStatus = (option) => {
    setEmplStatus(option);
  };
  const handleAnnualIncome = (option) => {
    setAnnualInc(option);
  };
  const handleBankcrutpcyStatus = (option) => {
    setBankcruptcyStat(option);
  };
  const handleMortgagePayments = (option) => {
    setMortPayments(option);
  };
  const handleCreditScore = (option) => {
    setCreditScore(option);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
    if (value === 0) {
      PropertyGroupRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === 1) {
      loanGroupRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === 2) {
      DetailsGroupRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === 3) {
      WrapUpGroupRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const propertyGroupRect =
        PropertyGroupRef.current.getBoundingClientRect();
      const loanGroupRect = loanGroupRef.current.getBoundingClientRect();
      const detailsGroupRect = DetailsGroupRef.current.getBoundingClientRect();
      const wrapUpGroupRect = WrapUpGroupRef.current.getBoundingClientRect();

      if (scrollTop >= propertyGroupRect.top && scrollTop < loanGroupRect.top) {
        setCurrent(0);
      } else if (
        scrollTop >= loanGroupRect.top &&
        scrollTop < detailsGroupRect.top
      ) {
        setCurrent(1);
      } else if (
        scrollTop >= detailsGroupRect.top &&
        scrollTop < wrapUpGroupRect.top
      ) {
        setCurrent(2);
      } else if (scrollTop >= wrapUpGroupRect.top) {
        setCurrent(3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [PropertyGroupRef, loanGroupRef, DetailsGroupRef, WrapUpGroupRef]);

  const handleDropdownOptionClick = ({ key }) => {
    setSelectedDropdownOption(key);
  };

  const buttonGroup1 = [
    "Single family",
    "Multi-family",
    "Town home",
    "Condominium",
    "Mobile/Manufactured",
    "New construction",
  ];
  const buttonGroup4 = [
    "Greater than 2,000,000",
    "PHP1,000,000-800,000",
    "PHP700,000-600,000",
    "PHP500,000-400,000",
    "PHP300,000-200,000",
    "PHP100,000-50,000",
    "Less than 50,000",
  ];

  const buttonGroup2 = [
    "Primary residence",
    "Secondary/Vacation",
    "Investment property",
  ];
  const buttonGroup3 = [
    "Primary residence",
    "Secondary/Vacation",
    "Investment property",
  ];

  const items = [
    {
      title: "Property",
    },
    {
      title: "Loan",
    },
    {
      title: "Details",
    },
    {
      title: "Wrap Up",
    },
  ];

  const menu = (
    <Menu onClick={handleDropdownOptionClick}>
      <Menu.Item key="15%">15%</Menu.Item>
      <Menu.Item key="20%">20%</Menu.Item>
      <Menu.Item key="25%">25%</Menu.Item>
    </Menu>
  );
  return (
    <div className="refinance-container">
      <div className="refinance-content">
        <div className="refinance-group-one">
          <Steps
            current={current}
            onChange={onChange}
            // percent={100}
            labelPlacement="vertical"
            items={items}
            size="20px"
          />
        </div>
        <br />
        <br />
        <br />
        <div className="refinance-property-group">
          <div className="refinance-property-group-one" ref={PropertyGroupRef}>
            <h4>Property</h4>
            <span>Why do you want to refinance?</span>
            <div className="ref-btn-group">
              {[
                "Take cash out of home",
                "Pay off debts",
                "Lower my monthly payment",
              ].map((option, index) => (
                <button
                  key={index}
                  className={`ref-prop-btn ${
                    refPropquest1 === option ? "active" : `${option}`
                  }`}
                  onClick={() => handleRefPropQuest1(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-property-group-two">
            <span>What is your current mortgage interest rate?</span>
            <div className="ref-btn-group">
              <Dropdown overlay={menu}>
                <button
                  className="ref-dropdown"
                  onClick={handleDropdownButtonClick}
                  style={{ padding: "0px 0px 0px 20px" }}
                >
                  {selectedDropdownOption ||
                    "Select your current interest rate"}
                  <span style={{ padding: "0px 10px 0px 0px" }}>▼</span>
                </button>
              </Dropdown>
            </div>
          </div>
          <div className="refinance-property-group-three">
            <span>Why do you want to refinance?</span>
            <div className="ref-btn-group">
              {buttonGroup1.map((button, index) => (
                <button
                  key={index}
                  className={`ref-prop-btn ${
                    refPropquest2 === button ? "active" : ""
                  }`}
                  onClick={() => handleRefPropQuest2(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-property-group-four">
            <span>How will you use your new home?</span>
            <div className="ref-btn-group">
              {buttonGroup2.map((button, index) => (
                <button
                  key={index}
                  className={`ref-prop-btn ${
                    selectedbtnprop === button ? "active" : ""
                  }`}
                  onClick={() => handlefourthquestprop(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-property-group-five">
            <span>How will you use your new home?</span>
            <div className="ref-btn-group-five">
              <input
                className="amount-input-field-refinance"
                placeholder="Amount"
                value={refinanceAmount}
              ></input>
              <div className="refinance-slider">
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={refinanceAmount}
                  onChange={handleRefinanceAmountChange}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="refinance-loan-group" ref={loanGroupRef}>
          <div className="refinance-loan-group-one">
            <h4>Loans</h4>
            <span>What's your remaining balance of your current loan?</span>
            <span className="estimate">(an estimate is fine)</span>
            <div className="ref-btn-group">
              <input type="number" placeholder="PHP" />
            </div>
          </div>
          <div className="refinance-loan-group-two">
            <span>What's your remaining balance of your current loan?</span>
            <div className="ref-btn-group">
              <input type="number" placeholder="PHP" />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="refinance-details-group" ref={DetailsGroupRef}>
          <div className="refinance-details-group-one">
            <h4>Details</h4>
            <span>What is your current employment status?</span>
            <div className="ref-btn-group">
              {["Employed", "Self-employed", "Retired", "Not employed"].map(
                (status, index) => (
                  <button
                    key={index}
                    className={`ref-prop-btn ${
                      empStatus === status ? "active" : `${status}`
                    }`}
                    onClick={() => handleEmploymentStatus(status)}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="refinance-details-group-two">
            <span>
              What is your household gross (before taxes) annual income?
            </span>
            <div className="ref-btn-group-two">
              {buttonGroup4.map((button, index) => (
                <button
                  key={index}
                  className={`ref-prop-btn ${
                    annualInc === button ? "active" : ""
                  }`}
                  onClick={() => handleAnnualIncome(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-details-group-three">
            <span>Have you declared bankruptcy in the last 4 years?</span>
            <div className="ref-btn-group">
              {["No", "Yes"].map((answer, i) => (
                <button
                  key={i}
                  className={`ref-prop-btn ${
                    bankcruptcyStat === answer ? "active" : ""
                  }`}
                  onClick={() => handleBankcrutpcyStatus(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-details-group-four">
            <span>
              Have you made any late mortgage payments in the last 12 months?
            </span>
            <div className="ref-btn-group">
              {["No", "Yes"].map((answer, i) => (
                <button
                  key={i}
                  className={`ref-prop-btn ${
                    mortpayments === answer ? "active" : ""
                  }`}
                  onClick={() => handleMortgagePayments(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-details-group-five">
            <span>What is your credit score range?</span>
            <div className="ref-btn-group-five">
              {[
                "Excellent (720+)",
                "Good (680-719)",
                "Fair (660-679)",
                "Below average (620-659)",
                "Poor (520-619)",
                "Bad (Below 580)",
              ].map((score, index) => (
                <button
                  key={index}
                  className={`ref-prop-btn ${
                    creditscore === score ? "active" : ""
                  }`}
                  onClick={() => handleCreditScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
          <div className="refinance-details-group-six">
            <span>Where are you looking to buy?</span>
            <p>
              Enter the city or zip code of the area where you are home shopping
            </p>
            <div className="ref-btn-group-input">
              <div className="ref-btn-group">
                <input type="number" placeholder="City or zip code" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="refinance-wrap-up-group" ref={WrapUpGroupRef}>
          <WrapUpDetails/>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <SubmitApplicationCustom />
        <div>
          <CustomMlFooter />
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
export default RefinanceComponent;
