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
          borderRadius: "5px",
          width: "400px",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="modal-icon"
            style={{
              width: "24px",
              height: "24px",
              marginRight: "10px",
              color: "#4CAF50",
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7h20L12 2z" />
            <path d="M2 7v10l10 5 10-5V7" />
            <path d="M12 12v4" />
            <path d="M12 8v2" />
          </svg>
          <h2>Confirm Action</h2>
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
            className="confirm-button"
            style={{
              backgroundColor: "#4CAF50" /* Green */,
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="cancel-button"
            style={{
              backgroundColor: "#f44336" /* Red */,
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
