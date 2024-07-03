import React from "react";
import "../../../styles/submitapplicationcustom.css";
import { useState } from "react";
import SuccessModal from "../../modals/SuccessModal";

const SubmitApplicationCustom = ({ successModalMessage ,isSubmitButtonDisabled,
  setIsSubmitButtonDisabled, mobileNumber,zipCode,firstname, lastname, email}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isSubmitButtonDisabled) {
        setShowModal(true);
      }
      if (mobileNumber.trim() === '' || zipCode.trim() === ''||  firstname.trim() === ''||lastname.trim() === '' || email.trim() === '') {
        setHasError(true);
        return;
      }
      console.log('Mobile Number:', mobileNumber);
      console.log('Zip Code:', zipCode);
      setHasError(false);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleCloseSuccessModal = () => {
      setShowSuccessModal(false);
    };
  
    return (
      <div className="divs-btn-group">
        <button type="primary" className="submit-btn" onClick={handleSubmit} aria-label="Submit Application" 
            disabled={isSubmitButtonDisabled}
            style={{
              backgroundColor: isSubmitButtonDisabled ? 'gray' : '#ff2800',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '30px',
              cursor: isSubmitButtonDisabled ? 'not-allowed' : 'pointer',
          }} >
            {hasError && (
              <div>
                Please fill in all the required fields.
              </div>
            )}
          Submit
        </button>
        <br />
        <span>
          By submitting, I agree my information may be shared and that I may be contacted at this number including through emails. I agree to the privacy policy and terms.
        </span>
        {showModal && (
          <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              top: "0px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              zIndex: 100,
              padding: "100px 0px 0px 0px",
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "#276638", fontSize: "20px" }}>Successfully Submitted!</h2>
              <p style={{ fontSize: "12px" }}>
                Your mortgage refinance pre-approval is being processed. We appreciate your patience and will notify you as
                soon as your pre-approval is finalized. Thank you!
              </p>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#276638",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
              >
                OK, Noted
              </button>
            </div>
          </div>
        )}
  
        {showSuccessModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <SuccessModal message={successModalMessage} onClose={handleCloseSuccessModal} />
          </div>
        )}
      </div>
    );
  };

export default SubmitApplicationCustom;
