import React from "react";
import "../styles/SuccessModalComponent.css";
import { Button } from "antd";

const SuccessModalComponent = ({ title, message, showButton }) => {
  return (
    <div className="main-container">
      <div className="modal-container">
        <h4 className="title">{title}</h4>
        <p className="message">{message}</p>
        {showButton && (
          <Button id="noted-btn" type="primary">
            Ok, Noted!
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuccessModalComponent;

