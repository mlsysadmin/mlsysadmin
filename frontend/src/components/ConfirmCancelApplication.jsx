import React from 'react';
// Ensure the CSS file exists at the specified path. If not, comment this line out or create the file.
import "../styles/ConfirmationCancelApplication.css";

const ConfirmCancelApplication = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-confirm-cancellation-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to cancel your application?</h2>
        <p>By proceeding, I agree to cancel the application.</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Back
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Cancel Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelApplication;
