import React from "react";
import "../styles/applicationModal.css";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ApplicationModal = () => {
  return (
    <div className="modal-main-container">
      <div className="application-modal-container">
        <h3 className="application-header">Application Details</h3>
        <div className="application-modal-content">
          <div className="application-first-column">
            <div className="application-content">
              <p>Mobile Number</p>
              <input
                type="text"
                className="application-input"
                placeholder="09"
              />
            </div>
            <div className="application-content">
              <p>Lastname</p>
              <input
                type="text"
                className="application-input"
                placeholder="Lastname"
              />
            </div>
            <div className="application-content">
              <p>Country</p>
              <div className="application-select">
                <p>Select Country</p>
                <p>
                  <CaretDownOutlined />
                </p>
              </div>
            </div>
            <div className="application-content">
              <p>Zipcode</p>
              <div className="application-select">
                <p>Zipcode</p>
                <p>
                  <CaretDownOutlined />
                </p>
              </div>
            </div>
          </div>
          <div className="application-second-column">
            <div className="application-content">
              <p>Email Address</p>
              <input
                type="text"
                className="application-input"
                placeholder="Email Address"
              />
            </div>
            <div className="application-content">
              <p>First Name</p>
              <input
                type="text"
                className="application-input"
                placeholder="First Name"
              />
            </div>
            <div className="application-content">
              <p>City</p>
              <div className="application-select">
                <p>Select City</p>
                <p>
                  <CaretDownOutlined />
                </p>
              </div>
            </div>
            <div className="application-content">
              <p>Province</p>
              <div className="application-select">
                <p>Select Province</p>
                <p>
                  <CaretDownOutlined />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="address-input">
          <p>House No/Unit/Building Name/Street</p>
          <input
            type="text"
            className="application-input"
            placeholder="Enter House No/Unit/Building Name/Street"
          />
        </div>
        <Button id="application-submitbtn" type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApplicationModal;
