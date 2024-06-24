import React, { useState } from "react";
import MainLayout from "./layout/layout.component";
import SubmitApplicationCustom from "./custom/application/submitapplication.custom";
import { Steps, Menu, Dropdown, Slider } from 'antd';
import '../styles/refinance.css'
import FooterComponent from "./layout/FooterComponent";
import WrapUpDetails from "./custom/application/wrapup.custom";
import CustomMlFooter from "./custom/Custom.Mlfooter";

const RefinanceComponent = () => {
    const { Step } = Steps
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
    const [refPropquest1, setRefPropQuest1] = useState(null);
    const [refinanceAmount, setRefinanceAmount] = useState(0);

    const handleRefPropQuest1 = (event) => {
        setRefPropQuest1(event.target.textContent);
    }
    const handleRefinanceAmountChange = (values) => {
        setRefinanceAmount(values);
    }
    const handleDropdownButtonClick = (event) => {
        setSelectedButton(event.target.textContent);
    };

    const handleDropdownOptionClick = ({ key }) => {
        setSelectedDropdownOption(key);
    };

    const menu = (
        <Menu onClick={handleDropdownOptionClick}>
            <Menu.Item key="option1">15%</Menu.Item>
            <Menu.Item key="option2">20%</Menu.Item>
            <Menu.Item key="option3">25%</Menu.Item>
        </Menu>
    );
    return (
        <div className="refinance-container">
            <div className="refinance-content">
                <MainLayout />
                <div className="refinance-group-one">
                    <Steps
                        // current={0}
                        style={{
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

                            description="Loan"
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
                </div><br /><br /><br />
                <div className="refinance-property-group">
                    <div className="refinance-property-group-one">
                        <h4>Property</h4>
                        <span>Why do you want to refinance?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Take cash out of home
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Pay off debts
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Lower my monthly payment
                            </button>
                        </div>
                    </div>
                    <div className="refinance-property-group-two">
                        <span>What is your current mortgage interest rate?</span>
                        <div className="ref-btn-group">
                            <Dropdown overlay={menu}>
                                <button className="ref-dropdown" onClick={handleDropdownButtonClick} >
                                    {selectedDropdownOption || 'Select your current interest rate'}
                                    <span>▼</span>
                                </button>
                            </Dropdown>

                        </div>
                    </div>
                    <div className="refinance-property-group-three">
                        <span>Why do you want to refinance?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Single family
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Multi-family
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Town home
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Condominium
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Mobile/Manufactured
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >New construction
                            </button>
                        </div>
                    </div>
                    <div className="refinance-property-group-four">
                        <span>How will you use your new home?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Primary residence
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Secondary/Vacation
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Investment property
                            </button>
                        </div>
                    </div>
                    <div className="refinance-property-group-five">
                        <span>How will you use your new home?</span>
                        <div className="ref-btn-group-five">
                            <input
                                className="amount-input-field-refinance" placeholder="Amount" value={refinanceAmount}
                            >
                            </input>
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
                <div className="refinance-loan-group">
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
                <div className="refinance-details-group">
                    <div className="refinance-details-group-one">
                        <h4>Details</h4>
                        <span>What is your current employment status?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Employed
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Self-employed
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Retired
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Not employed
                            </button>
                        </div>
                    </div>
                    <div className="refinance-details-group-two">
                        <span>What is your household gross (before taxes) annual income?</span>
                        <div className="ref-btn-group-two">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Greater than 2,000,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >PHP1,000,000-800,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >PHP700,000-600,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >PHP500,000-400,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >PHP300,000-200,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >PHP100,000-50,000
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Lower my monthly payment' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Less than 50,000
                            </button>
                        </div>
                    </div>
                    <div className="refinance-details-group-three">
                        <span>Have you declared bankruptcy in the last 4 years?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >No
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Yes
                            </button>
                        </div>
                    </div>
                    <div className="refinance-details-group-four">
                        <span>Have you made any late mortgage payments in the last 12 months?</span>
                        <div className="ref-btn-group">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >No
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Yes
                            </button>
                        </div>
                    </div>
                    <div className="refinance-details-group-five">
                        <span>Have you made any late mortgage payments in the last 12 months?</span>
                        <div className="ref-btn-group-five">
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Excellent (720+)
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Good (680-719)
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Fair (660-679)
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Below average (620-659)
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Take cash out of home' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Poor (520-619)
                            </button>
                            <button
                                className={`ref-prop-btn ${refPropquest1 === 'Pay off debts' ? 'active' : ''}`}
                                onClick={handleRefPropQuest1}
                            >Bad (Below 580)
                            </button>
                        </div>
                    </div>
                    <div className="refinance-details-group-six">
                        <span>Where are you looking to buy?</span>
                        <p>Enter the city or zip code of the area where you are home shopping</p>
                        <div className="ref-btn-group-input">
                            <div className="ref-btn-group">
                                <input type="number" placeholder="City or zip code" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="refinance-wrap-up-group">
                    <WrapUpDetails />
                    <span className="prop-quest">What is your current ZIP code?</span>
                    <span>Your information is protected by SSL encryption.</span>
                    <div className="refinance-wrap-up-group-one">
                        <input type="address" placeholder="Street Address"
                        ></input>
                        <input type="number" placeholder="Zip Code" className="first-last"
                        ></input>
                    </div>
                    <div className="refinance-wrap-up-group-two">
                        <span>What is the best number to reach you?</span>
                        <p>Your information is protected by SSL encryption.</p>
                        <div className="ref-btn-group-input">
                            <div className="ref-btn-group">
                                <input type="number" placeholder="City or zip code" />
                            </div>
                        </div>
                    </div>
                </div><br/><br/><br/><br/><br/>
                <SubmitApplicationCustom/>
                <div>
                    <CustomMlFooter/>
                    <FooterComponent/>
                </div>
            </div>
        </div>
    );
}
export default RefinanceComponent;