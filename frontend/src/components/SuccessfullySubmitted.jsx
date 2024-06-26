import React from "react";
import SuccessModalComponent from "./SuccessModalComponent";
import "../styles/SuccessModal.css";

const SuccessfullySubmitted = () => {
  return (
    <div>
      <div>
        <div className="modal-message">
          <SuccessModalComponent
            title="Successfully Submitted!"
            message="  Your mortgage refinance pre-approval is  being processed. 
 We appreciate your patience and will notify you as soon as your pre-approval is finalized. Thank you!"
            showButton={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessfullySubmitted;
