import React from "react";
import "../styles/insuranceguide.css";
import InsuranceGuide from "../asset/icons/insuranceguide.png";
import InsuranceHouse from "../asset/icons/insurancehouse.png";
import AutoInsurance from "../asset/icons/autoinsurance.png";
import HealthInsurance from "../asset/icons/healthinsurance.png";
import TravelInsurance from "../asset/icons/travelinsurance.png";
import MainLayout from "./layout/layout.component";
import { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";

const InsuranceGuideComponent = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const menu = (
        <Menu>
            <Menu.Item key="question1">
                {activeQuestion === 'question1' && (
                    <div>
                        M Lhuillier offers Pinoy Protect Plus, Family Protect Plus, Pawners Protect, Family Protect, and
                        Kwarta Padala Protect.
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
        <div className="insurance-guide-container">
            <MainLayout />
            <div className="insurance-guide-contents">
                <div className="insurance-guide-content-one">
                    <div className="insurance-guide-tagline">
                        <span> Life your life <br />without worry.</span><br />
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Secure your home in uncertain times.<br />
                            &nbsp;&nbsp;ML Home Insurance will help you protect<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            and guard your home.</p>
                    </div>
                    <img src={InsuranceGuide}></img>
                </div>
                <div className="insurance-guide-content-two">
                    <div className="insurance-guide-inboxes">
                        <div className="home-insurance-inbox">
                            <img src={InsuranceHouse}></img>
                            <span>Home Insurance</span><br />
                            <p>Protect your home and your loved ones with
                                ML Home Insurance.</p>
                        </div>
                        <div className="auto-insurance-inbox">
                            <img src={AutoInsurance}></img>
                            <span>Auto Insurance</span><br />
                            <p>Choose ML Auto Insurance and discover unmatched protection for your vehicle.</p>
                        </div>
                        <div className="health-insurance-inbox">
                            <img src={HealthInsurance}></img>
                            <span>Health Insurance</span><br />
                            <p>Elevate Your Well-being with ML Health Insurance.
                            </p>
                        </div>
                        <div className="travel-insurance-inbox">
                            <img src={TravelInsurance}></img>
                            <span>Travel Insurance</span><br />
                            <p>Don't wait until you're sick or injured to think about health insurance.</p>
                        </div>
                    </div>
                    <div className="insurance-guide-tagline-two">
                        <span><b style={{ color: '#ff2800' }}>Choose an Insurance</b> <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and let us worry <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            about the rest.</span><br />
                        <p>We’re here to help. Connect with M Lhuillier today!</p>
                    </div>
                </div>
                <div className="insurance-guide-content-three">
                    <span>Get Insured Today!</span><br />
                    <div className="insurance-guide-content-three-input">
                        <input type="email" placeholder="Enter your email address here" />
                        <button>Contact Us</button>
                    </div>
                </div>
                <div className="insurance-guide-content-four">
                    <span>Other ML Insurance Products</span>
                    <div className="other-insurance-products">
                        <div className="health-insurance-products">
                            <span className="health-insurance-title">Health Insurance</span>
                            <div className="insurance-child">
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Dengue Rx Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Emergency Room Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Medicare Plus Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Mediphone Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Personal Accident Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Virtual Medical Assistance</p>
                                </div>
                            </div>

                        </div>
                        <div className="travel-insurance-products">
                            <span className="health-insurance-title">Travel Insurance</span>
                            <div className="insurance-child">
                            <div className="insurance-child">
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>Global Travel Protect 
                                    Insurance</p>
                                </div>
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>OFW Balik Manggagawa 
                                    Insurance</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="auto-insurance-products">
                            <span className="health-insurance-title">Auto Insurance</span>
                            <div className="insurance-child">
                                <div className="check-circle">
                                    <span className="check-icon">✓</span>
                                    <p>CTPL Insurance</p>
                                </div>
                                <div className="radio-buttons">
                                    <input type="radio" name="vehicle-type" value="motorcycle" checked />
                                    Motorcycle<br />
                                    <input type="radio" name="vehicle-type" value="private-car" checked />
                                    Private Car<br />
                                    <input type="radio" name="vehicle-type" value="private-car" checked />
                                    Commercial Vehicle
                                    (Light/Medium/Heavy)<br />
                                    <input type="radio" name="vehicle-type" value="private-car" checked />
                                    LTO (MC/Heavy)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="insurance-guide-content-five">
                    <span>Frequently Asked Questions</span>
                    <div className="questions">
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question1')}
                        >
                            <div className="dropdown-label">What are the insurance plans offered by M Lhuillier?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question2')}
                        >
                            <div className="dropdown-label">What are the requirements for insurance plans?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                            onVisibleChange={(visible) => handleDropdownVisibilityChange(visible, 'question3')}
                        >
                            <div className="dropdown-label">How can I claim the insurance?<DownOutlined style={{ color: '#ff2800' }} /></div>
                        </Dropdown>
                    </div>
                </div>
            </div><br /><br />
            <CustomMlFooter />
            <FooterComponent />
        </div>
    );
}
export default InsuranceGuideComponent;