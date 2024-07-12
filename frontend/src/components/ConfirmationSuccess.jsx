import React from "react";
import "../styles/SuccessModalComponent.css";
import { Button } from "antd";

const ConfirmationSuccess = ({ setIsSuccessModalOpen }) => {
  const handleSuccessClose = () => setIsSuccessModalOpen(false);

  return (
    <div className="main-container">
      <div className="modal-container" onClick={handleSuccessClose}>
        <h4 className="title">Successful Message</h4>
        <p className="message">Your application has been successfully canceled.</p>
      </div>
    </div>
  );
};

export default ConfirmationSuccess;
