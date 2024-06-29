import React from "react";
import { useState } from "react";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import MainLayout from "./layout/layout.component";
import { Slider, Progress, Menu, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import homeicon from "../asset/icons/homeicon.png";
import dollaricon from "../asset/icons/dollar-icon.png";
import "../styles/discoverhome.css";


const DiscoverHomeComponent = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [HomepriceRange, setHomePriceRange] = useState([100000]);
    const [DppriceRange, setDpHomePriceRange] = useState([100000]);
    const [interestRate, setInterestRate] = useState(0);

    const handleHomePriceRangeChange = (values) => {
        setHomePriceRange(values);
    };
    const handleDpPriceRange = (values) => {
        setDpHomePriceRange(values);
    }
    const handleInterestRateChange = (values) => {
        setInterestRate(values);
    }
    const menu = (
        <Menu>
            <Menu.Item key="question1">
                {activeQuestion === 'question1' && (
                    <div>
                        The typical down payment for a conventional mortgage is 20% of the home's purchase price. However, there are also options like FHA loans that only require 3.5% down.
                    </div>
                )}
            </Menu.Item>
            <Menu.Item key="question2">
                {activeQuestion === 'question2' && (
                    <div>
                        The down payment is an important factor in the home buying process. It helps you build equity in the home and can also impact your interest rate and monthly payments.
                    </div>
                )}
            </Menu.Item>
            <Menu.Item key="question3">
                {activeQuestion === 'question3' && (
                    <div>
                        There are a few tips to help save for a down payment, such as cutting expenses, increasing your income, and using a dedicated savings account.
                    </div>
                )}
            </Menu.Item>
        </Menu>
    );

    const handleDropdownVisibilityChange = (visible, key) => {
        if (visible) {
            setActiveQuestion(key);
        } else {
            setActiveQuestion(null);
        }
    };
    return (
        <div className="discover-home-container">
            <div className="discover-home">
                <div className="discover-home-content">
                    <div className="discover-overlap">
                        <div className="disc-content-container">
                            <div className="discover-words">
                                <span className="smart-way-to-get-a">
                                    Smart way to get a
                                </span>
                                <span className="home-loan"> Home Loan</span>
                                <span className="discover-tagline">Home financing to make your goals reality.</span>
                            </div>
                            <div className="discover-upper-btn">
                                <div className="refinance-a-home">
                                    <div className="refinance-btn">
                                        <a href="/refinance-page"><span>Refinance a Home</span></a>
                                    </div>
                                </div>
                                <div className="buy-a-home">
                                    <div className="buy-home-text">
                                        <a href="/buy-a-home-page"><span>Buy a Home</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mortgageexp">
                    <div className="mortgage-cont">
                        <span className="mortgage-title">A new kind of mortgage experience</span>
                        <div className="mortgage-slide-group">
                            <div className="mortgage-slide">
                                <div className="ms1-group">
                                    <span className="ms1-title">Easy Payment</span>
                                    <span className="ms1-text">
                                        Making mortgage payments easier often involves exploring various options and strategies.
                                    </span>
                                </div>
                                <div className="ms2-group">
                                    <span className="ms2-title">Apply online with ease</span>
                                    <span className="ms2-text">
                                        Securely import documents from thousands of financial institutions in a few clicks.
                                    </span>
                                </div>
                                <div className="ms3-group">
                                    <span className="ms3-title">Get one-on-one support</span>
                                    <span className="ms3-text">
                                        You’ll get support and regular updates from a dedicated Mortgage Consultant.
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
                                <span className="text-wrapper">Get pre-approved</span>
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
                                            <div style={{ fontSize: '16px', fontWeight: 'bold' }} className="montly-pay-cal">
                                                PHP 200  <br />per month
                                            </div>

                                        )}
                                        gapDegree={10}
                                        gapPosition="bottom"
                                    />
                                </div>
                                <div className="principal">
                                        <div className="content-info-mortgage">
                                            <div className="payment-breakdown">
                                                <div className="radio-circle" style={{ backgroundColor: 'rgba(140, 144, 148, 0.62)' }} />
                                                <span>10% down payment</span>
                                            </div>
                                            <div className="payment-breakdown">
                                                <div className="radio-circle" style={{ backgroundColor: '#8C9094' }} />
                                                <span>30 years fixed</span>
                                            </div>
                                            <div className="payment-breakdown">
                                                <div className="radio-circle" style={{ backgroundColor: '#D90000' }} />
                                                <span >Principal&nbsp;&nbsp;XXX,XXX</span>
                                            </div>
                                            <div className="payment-breakdown">
                                                <div className="radio-circle" style={{ backgroundColor: '#F9C7C7' }} />
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
                    <span className="home-tagline">Home financing to make your goals a reality.</span>
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
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question1')}
                        >
                            <div className="dropdown-label">How much do you need to put down on a house?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question2')}
                        >
                            <div className="dropdown-label">How do I choose a mortgage lender?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question3')}
                        >
                            <div className="dropdown-label">How much mortgage can I afford?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question4')}
                        >
                            <div className="dropdown-label">What is mortgage pre-qualification?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question5')}
                        >
                            <div className="dropdown-label">How do I qualify to buy a home? <DownOutlined style={{ color: '#ff2800' }} /> </div>

                        </Dropdown>
                    </div>
                </div>
            </div>
            <CustomMlFooter />
            <FooterComponent />

        </div>
    );
}
export default DiscoverHomeComponent