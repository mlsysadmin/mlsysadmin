// ConfirmModal.js
import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "auto"
          }}
        >
          <p
            style={{
              fontSize: "15px",
              fontWeight: "500"
            }}
          >
            Confirm Action
          </p>
        </div>
        <p>{message}</p>
        <div
          className="modal-buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            className="cancel-button"
            style={{
              backgroundColor: "white" /* Red */,
              color: "#f44336",
              border: "1px solid var(--red)",
              padding: "10px 10px",
              borderRadius: "5px",
              fontSize: "var(--d-body-text) !important",
              fontWeight: "normal",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            No, Go Back
          </button>
          <button
            className="confirm-button"
            style={{
              backgroundColor: "var(--red)" /* Green */,
              color: "#fff",
              border: "none",
              padding: "10px 10px",
              borderRadius: "var(--radius)",
              marginLeft: "10px",
              cursor: "pointer",
              fontWeight: "normal",
            }}
            onClick={onConfirm}
          >
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
