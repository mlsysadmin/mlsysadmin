import React from "react";
import { useState } from "react";
import "../styles/buyahome.css"
import MainLayout from "./layout/layout.component";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import { Button, Steps } from "antd";
import WrapUpDetails from "./custom/application/wrapup.custom";
import SubmitApplicationCustom from "./custom/application/submitapplication.custom";

const BuyAHomeComponent = () => {
    const { Step } = Steps
    //property handler
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedHomeButton, setSelectedHomeButton] = useState(null);
    const [selectedNewHomeButton, setSelectedNewHomeButton] = useState(null);
    const [buttonClick, setButtonClick] = useState(null);

    //timeline handler
    const [timelinequest1, setTimelinequest1] = useState(null);
    const [timelinequest2, setTimelinequest2] = useState(null);
    const [timelinequest3, setTimelinequest3] = useState(null);

    //details handler
    const [detailsquest1, setDetailsquest1] = useState(null);
    const [detailsquest2, setDetailsquest2] = useState(null);
    const [detailsquest3, setDetailsquest3] = useState(null);
    const [detailsquest4, setDetailsquest4] = useState(null);
    const [detailsquest5, setDetailsquest5] = useState(null);
    const [detailsquest6, setDetailsquest6] = useState(null);

    //property handler
    const handleSpendButtonClick = (event) => {
        setSelectedButton(event.target.textContent);
    };
    const handleHomeButtonClick = (event) => {
        setSelectedHomeButton(event.target.textContent);
    };
    const handleNewHomeButtonClick = (event) => {
        setSelectedNewHomeButton(event.target.textContent);
    };
    const handleAgentClick = (event) => {
        setButtonClick(event.target.textContent);
    };

    //timelinehandler
    const handleTimelineQuest1 = (event) => {
        setTimelinequest1(event.target.textContent);
    }
    const handleTimelineQuest2 = (event) => {
        setTimelinequest2(event.target.textContent);
    }
    const handleTimelineQuest3 = (event) => {
        setTimelinequest3(event.target.textContent);
    }

    //detailshandler
    const handleDetailsquest1 = (event) => {
        setDetailsquest1(event.target.textContent);
    }
    const handleDetailsquest2 = (event) => {
        setDetailsquest2(event.target.textContent);
    }
    const handleDetailsquest3 = (event) => {
        setDetailsquest3(event.target.textContent);
    }
    const handleDetailsquest4 = (event) => {
        setDetailsquest4(event.target.textContent);
    }
    const handleDetailsquest5 = (event) => {
        setDetailsquest5(event.target.textContent);
    }
    const handleDetailsquest6 = (event) => {
        setDetailsquest6(event.target.textContent);
    }



    return (
        <div className="buy-a-home-container">
            <MainLayout />
            <div className="buy-a-home-content" >
                <div className="radiobtn-group">
                    <Steps
                        // current={0}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '24px',
                            color: 'red'

                        }}
                        labelPlacement="vertical"
                    >
                        <Step

                            description="Property"
                            style={{ cursor: 'pointer' }}
                        />
                        <Step

                            description="Timeline"
                            style={{ cursor: 'pointer' }}
                        />
                        <Step

                            description="Details"
                            style={{ cursor: 'pointer' }}
                        />
                        <Step
                            description="Wrap-up"
                            style={{ cursor: 'pointer' }}
                        />
                    </Steps>
                </div>
            </div>
            <div className="property-information-container">
                <div className="prop-content">
                    <div className="prop-content1">
                        <h3>Property</h3>
                        <span className="prop-quest">How much do you plan to spend on your new home?</span><br />
                        <span>(An estimate is fine)</span>
                        <div className="prop-info-btn-group">
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 1,000,000 or more' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 1,000,000 or more
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 900,000 - 800,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 900,000 - 800,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 700,000 - 600,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 700,000 - 600,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 500,000 - 400,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 600,000 - 500,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 500,000 - 400,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 500,000 - 400,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 300,000 - 200,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 300,000 - 200,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 100,000 - 50,000' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 100,000 - 50,000
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'PHP 50,000 or less' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                PHP 50,000 or less
                            </button>
                        </div><br /><br /><br /><br />
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">What kind of home are you looking for?</span><br />
                            <div className="prop-info-btn-group1">
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'Single family' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    Single family
                                </button>
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'Multi-family' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    Multi-family
                                </button>
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'Town home' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    Town home
                                </button>
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'Condominium' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    Condominium
                                </button>
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'Mobile/Manufactured' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    Mobile/Manufactured
                                </button>
                                <button
                                    className={`prop-btn ${selectedHomeButton === 'New construction' ? 'active' : ''}`}
                                    onClick={handleHomeButtonClick}
                                >
                                    New construction
                                </button>
                            </div>
                        </div><br /><br /><br /><br />
                        <div className="prop-content3">
                            <br />
                            <span className="prop-quest">How will you use your new home?</span><br />
                            <div className="prop-info-btn-group2">
                                <button
                                    className={`prop-btn ${selectedNewHomeButton === 'Primary residence' ? 'active' : ''}`}
                                    onClick={handleNewHomeButtonClick}
                                >
                                    Primary residence
                                </button>
                                <button
                                    className={`prop-btn ${selectedNewHomeButton === 'Secondary/Vacation' ? 'active' : ''}`}
                                    onClick={handleNewHomeButtonClick}
                                >
                                    Secondary/Vacation
                                </button>
                                <button
                                    className={`prop-btn ${selectedNewHomeButton === 'Investment property' ? 'active' : ''}`}
                                    onClick={handleNewHomeButtonClick}
                                >
                                    Investment property
                                </button>
                            </div>
                        </div><br /><br /><br /><br />
                        <div className="prop-content4">
                            <br />
                            <span className="prop-quest">Do you have a real estate agent?</span><br />
                            <div className="prop-info-btn-group3">
                                <button
                                    className={`prop-btn ${buttonClick === 'No' ? 'active' : ''}`}
                                    onClick={handleAgentClick}
                                >
                                    No
                                </button>
                                <button
                                    className={`prop-btn ${buttonClick === 'Yes' ? 'active' : ''}`}
                                    onClick={handleAgentClick}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div><br /><br /><br /><br />
                    {/* timeline */}
                    <div className="prop-content1">
                        <h3>Timeline</h3>
                        <span className="prop-quest">When are you planning to make your home purchase?</span><br />
                        <div className="prop-info-btn-group-timeline">
                            <button
                                className={`prop-btn ${timelinequest1 === 'Immediately: I have a signed purchase agreement' ? 'active' : ''}`}
                                onClick={handleTimelineQuest1}
                            >
                                <b>Immediately</b>: I have a signed purchase agreement
                            </button>
                            <button
                                className={`prop-btn ${timelinequest1 === 'ASAP: I have found a house /offer pending' ? 'active' : ''}`}
                                onClick={handleTimelineQuest1}
                            >
                                <b>ASAP</b>: I have found a house /offer pending
                            </button>
                            <button
                                className={`prop-btn ${timelinequest1 === 'Within 30 days' ? 'active' : ''}`}
                                onClick={handleTimelineQuest1}
                            >
                                Within 30 days
                            </button>
                            <button
                                className={`prop-btn ${timelinequest1 === '2 - 3 months' ? 'active' : ''}`}
                                onClick={handleTimelineQuest1}
                            >
                                2 - 3 months
                            </button>
                            <button
                                className={`prop-btn ${timelinequest1 === '3 - 6 months' ? 'active' : ''}`}
                                onClick={handleTimelineQuest1}
                            >
                                3 - 6 months
                            </button>
                            <button
                                className={`prop-btn ${timelinequest1 === '6 + months' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                6 + months
                            </button>
                            <button
                                className={`prop-btn ${selectedButton === 'I dont know' ? 'active' : ''}`}
                                onClick={handleSpendButtonClick}
                            >
                                I dont know
                            </button>
                        </div>
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">Do you currently own a home?</span><br />
                            <div className="prop-info-btn-group1">
                                <button
                                    className={`prop-btn ${timelinequest2 === 'Yes, I currently own a home' ? 'active' : ''}`}
                                    onClick={handleTimelineQuest2}
                                >
                                    Yes, I currently own a home
                                </button>
                                <button
                                    className={`prop-btn ${timelinequest2 === 'No, I am currently renting' ? 'active' : ''}`}
                                    onClick={handleTimelineQuest2}
                                >
                                    No, I am currently renting
                                </button>
                                <button
                                    className={`prop-btn ${timelinequest2 === 'No, I have other living arrangements' ? 'active' : ''}`}
                                    onClick={handleTimelineQuest2}
                                >
                                    No, I have other living arrangements
                                </button>
                            </div>
                        </div>
                        <div className="prop-content4">
                            <br />
                            <span className="prop-quest">Do you have a real estate agent?</span><br />
                            <div className="prop-info-btn-group3">
                                <button
                                    className={`prop-btn ${timelinequest3 === 'No' ? 'active' : ''}`}
                                    onClick={handleTimelineQuest3}
                                >
                                    No
                                </button>
                                <button
                                    className={`prop-btn ${timelinequest3 === 'Yes' ? 'active' : ''}`}
                                    onClick={handleTimelineQuest3}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div><br /><br /><br /><br />
                    {/* Details */}
                    <div className="prop-content5">
                        <h3>Details</h3>
                        <span className="prop-quest">Do you currently own a home?</span><br />
                        <div className="prop-info-btn-group-details">
                            <button
                                className={`prop-btn ${detailsquest1 === 'Immediately: I have a signed purchase agreement ' ? 'active' : ''}`}
                                onClick={handleDetailsquest1}
                            >
                                Yes, I currently own a home
                            </button>
                            <button
                                className={`prop-btn ${detailsquest1 === 'PHP 900,000 - 800,000' ? 'active' : ''}`}
                                onClick={handleDetailsquest1}
                            >
                                No, I am currently renting
                            </button>
                            <button
                                className={`prop-btn ${detailsquest1 === 'PHP 700,000 - 600,000' ? 'active' : ''}`}
                                onClick={handleDetailsquest1}
                            >
                                No, I have other living arrangements
                            </button>
                        </div><br /><br />
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">How much of a down payment would you like to make?</span><br />
                            <span>(An estimate is fine)</span>
                            <div className="prop-info-btn-group1">
                                <button
                                    className={`prop-btn ${detailsquest2 === 'Single family' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    3% (50,000)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest2 === 'Multi-family' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    5% (100,000)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest2 === 'Town home' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    10% (200,000)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest2 === 'Condominium' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    15% (300,000 - 500,000)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest2 === 'Mobile/Manufactured' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    20% (600,000 - 1,000,000)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest2 === 'New construction' ? 'active' : ''}`}
                                    onClick={handleDetailsquest2}
                                >
                                    More than <br />
                                    20%

                                </button>
                            </div>
                        </div><br /><br />
                        <div className="prop-content3">
                            <br />
                            <span className="prop-quest">What is your current employment status?</span><br />
                            <div className="prop-info-btn-group2">
                                <button
                                    className={`prop-btn ${detailsquest3 === 'Employed' ? 'active' : ''}`}
                                    onClick={handleDetailsquest3}
                                >
                                    Employed
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest3 === 'Self-employed' ? 'active' : ''}`}
                                    onClick={handleDetailsquest3}
                                >
                                    Self-employed
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest3 === 'Retired' ? 'active' : ''}`}
                                    onClick={handleDetailsquest3}
                                >
                                    Retired
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest3 === 'Not employed' ? 'active' : ''}`}
                                    onClick={handleDetailsquest3}
                                >
                                    Not employed
                                </button>
                            </div>
                        </div><br /><br />
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">What is your current employment status?</span><br />
                            <div className="prop-info-btn-group1">
                                <button
                                    className={`prop-btn ${detailsquest4 === 'Greater than 2,000,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    Greater than 2,000,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'PHP1,000,000-800,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    PHP1,000,000-800,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'PHP700,000-600,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    PHP700,000-600,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'PHP500,000-400,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    PHP500,000-400,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'PHP300,000-200,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    PHP300,000-200,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'PHP100,000-50,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    PHP100,000-50,000
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest4 === 'Less than 50,000' ? 'active' : ''}`}
                                    onClick={handleDetailsquest4}
                                >
                                    Less than 50,000
                                </button>
                            </div>
                        </div><br /><br />
                        <div className="prop-content4">
                            <br />
                            <span className="prop-quest">Have you declared bankruptcy in the last 4 years?</span><br />
                            <div className="prop-info-btn-group3">
                                <button
                                    className={`prop-btn ${detailsquest5 === 'No' ? 'active' : ''}`}
                                    onClick={handleDetailsquest5}
                                >
                                    No
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest5 === 'Yes' ? 'active' : ''}`}
                                    onClick={handleDetailsquest5}
                                >
                                    Yes
                                </button>
                            </div>
                        </div><br /><br />
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">What is your current credit score?</span><br />
                            <div className="prop-info-btn-group1">
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Excellent (720+)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Excellent (720+)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Good (680-719)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Good (680-719)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Fair (660-679)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Fair (660-679)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Below average (620-659)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Below average (620-659)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Poor (520-619)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Poor <br /> (520-619)
                                </button>
                                <button
                                    className={`prop-btn ${detailsquest6 === 'Bad (Below 580)' ? 'active' : ''}`}
                                    onClick={handleDetailsquest6}
                                >
                                    Bad <br /> (Below 580)
                                </button>
                            </div>
                        </div><br /><br />
                        <div className="prop-content2">
                            <br />
                            <span className="prop-quest">Where are you looking to buy?</span><br />
                            <span>Enter the city or zip code of the area where you are home shopping</span>
                            <div className="prop-info-btn-group-details-input">
                                <input type="text" placeholder="City or zip code"
                                />
                            </div>
                        </div>
                    </div><br /><br /><br /><br />
                    {/* Wrap-up */}
                    <div className="prop-content1">
                        <WrapUpDetails />
                        <div className="prop-content3">
                            <br />
                            <span className="prop-quest">What is your mobile number?</span><br />
                            <span>Your information is protected by SSL encryption.</span>
                            <div className="prop-info-wrap-up-input">
                                <input type="number" placeholder="Mobile Number"
                                ></input>
                            </div>
                        </div>
                        <div className="prop-content4">
                            <br />
                            <span className="prop-quest">What is your current ZIP code?</span><br />
                            <span>Your information is protected by SSL encryption.</span>
                            <div className="prop-info-wrap-up-input">
                                <input type="number" placeholder="Zip Code"
                                ></input>
                            </div>
                        </div>
                    </div><br /><br /><br /><br />
                    <SubmitApplicationCustom/>
                </div>
            </div>
            <CustomMlFooter />
            <FooterComponent />
        </div>
    );
}

export default BuyAHomeComponent