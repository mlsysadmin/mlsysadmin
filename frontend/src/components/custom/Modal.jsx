import React from "react";
import "../../styles/modal.css";

const Modal = ({
  show,
  onClose,
  onConfirm,
  question,
  remarks,
  setRemarks,
  actionType,
}) => {
  if (!show) {
    return null;
  }

  let confirmButtonClass = "";

  switch (actionType) {
    case "pending":
      confirmButtonClass = "confirm-pending";
      break;
    case "disapprove":
      confirmButtonClass = "confirm-disapprove";
      break;
    case "approve":
      confirmButtonClass = "confirm-approve";
      break;
    default:
      confirmButtonClass = "confirm-default";
      break;
  }

  let cancelButtonClass = "";

  switch (actionType) {
    case "pending":
      cancelButtonClass = "cancel-pending";
      break;
    case "disapprove":
      cancelButtonClass = "cancel-disapprove";
      break;
    case "approve":
      cancelButtonClass = "cancel-approve";
      break;
    default:
      cancelButtonClass = "cancel-default";
      break;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          <h3>{question}</h3>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks..."
          ></textarea>
          <div className="modal-actions">
            <button
              className={`modal-confirm ${confirmButtonClass}`}
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className={`modal-cancel ${cancelButtonClass}`}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
