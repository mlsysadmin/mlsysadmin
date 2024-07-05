import React, { useState } from "react";
import "../styles/applicationModal.css";
import { Button } from "antd";

function FileUploadGrid() {
  const [files, setFiles] = useState([null, null, null, null]);

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Files selected:", files);
  };

  const descriptions = [
    {
      label: "Valid ID",
      span: "(for self/employed)",
    },
    {
      label: "Latest (ITR)",
      descriptionSpan: "Income Tax Return",
      span: "(for self/employed)",
    },
    {
      label: "Latest Payslip",
      span: "(for employed)",
    },
    {
      label: "Latest (COE)",
      descriptionSpan: "Certificate of Employment",
      span: "(for employed)",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-container">
        {files.map((file, index) => (
          <div key={index} className="grid-item">
            <div className="addButton">
              <input
                type="file"
                id={`file-input-${index}`}
                onChange={(event) => handleFileChange(index, event)}
              ></input>
              {!file && (
                <label htmlFor={`file-input-${index}`} className="file-label">
                  <span className="plus-icon">+</span>
                </label>
              )}
            </div>
            {file && <p>Selected file: {file.name}</p>}
            <div className="file-description">
              <p>{descriptions[index].label}</p>
              {descriptions[index].descriptionSpan && (
                <p className="description-span">
                  {descriptions[index].descriptionSpan}
                </p>
              )}
              <p className="files-span">{descriptions[index].span}</p>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

const ApplicationModal = () => {
  return (
    <div className="modal-main-container">
      <div className="application-modal-container">
        <h3 className="application-header">Application Details</h3>
        <div className="application-modal-content">
          <div className="application-row">
            <div className="application-first-row">
              <div className="application-content">
                <p>Mobile Number</p>
                <input
                  type="text"
                  className="application-input"
                  placeholder="09"
                />
              </div>
            </div>
            <div className="application-second-row">
              <div className="application-content">
                <p>Lastname</p>
                <input
                  type="text"
                  className="application-input"
                  placeholder="Lastname"
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
                <p>Email Address</p>
                <input
                  type="text"
                  className="application-input"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="application-third-row">
              <div className="application-content">
                <p>Country</p>
                <select className="application-select">
                  <option value="">Select Country</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="application-content">
                <p>Province/State</p>
                <select className="application-select">
                  <option value="">Select Province</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="application-content">
                <p>City/Town</p>
                <select className="application-select">
                  <option value="">Select City</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="application-fourth-row">
              <div className="application-content">
                <p>Zipcode</p>
                <select className="application-select">
                  <option value="">Zipcode</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="address-input">
                <p>House No/Unit/Building Name/Street</p>
                <input
                  type="text"
                  className="application-input"
                  placeholder="Enter House No/Unit/Building Name/Street"
                />
              </div>
            </div>
          </div>
          <div className="files-container">
            <h5>Upload Documents</h5>
            <div>
              <p style={{ color: "#8C9094" }}>
                All documents are required to be uploaded{" "}
                <span style={{ color: "red" }}>**</span>
              </p>
              <p>
                <em>if Employed - upload all requirements</em>
              </p>
              <p>
                <em>if Self-Employed - upload Valid ID & Latest ITR only</em>
              </p>
            </div>
            <FileUploadGrid />
          </div>
        </div>
        <div className="application-submitbtn">
          <Button id="application-submitbtn" type="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
