import React from "react";
import "../styles/SuccessModal.css"
import SuccessModalComponent from "./SuccessModalComponent";

const SuccessModal = () => {
  return (
    <div>
      <div>
        <SuccessModalComponent
          title="Successfully Submitted!"
          message=" Your application is yet to be reviewed. We will expedite the review
        process to minimize any inconvenience. Rest assured, we will keep you
        informed."
        showButton={false}
        />
      </div>
    </div>
  );
};

export default SuccessModal;
