import React, { useState } from "react";
import "../styles/applicationModal.css";
import { Button, message } from "antd";

function FileUploadGrid({ validateFiles }) {
  const [files, setFiles] = useState([null, null, null, null]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      message.error("Only image files are allowed!");
      return;
    }
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
    validateFiles(newFiles);
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
    <div className="grid-container">
      {files.map((file, index) => (
        <div key={index} className="grid-item">
          <div className="addButton">
            <input
              type="file"
              id={`file-input-${index}`}
              onChange={(event) => handleFileChange(index, event)}
              accept="image/*"
              required
            ></input>
            {!file && (
              <label htmlFor={`file-input-${index}`} className="file-label">
                <span className="plus-icon">+</span>
              </label>
            )}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected file ${index}`}
                className="selected-image"
              />
            )}
          </div>
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
  );
}

const ApplicationModal = () => {
  const [formValues, setFormValues] = useState({
    mobileNumber: "",
    lastName: "",
    firstName: "",
    email: "",
    country: "",
    province: "",
    city: "",
    zipcode: "",
    address: "",
  });
  const [files, setFiles] = useState([null, null, null, null]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (const key in formValues) {
      if (formValues[key] === "") {
        message.error("All fields are required!");
        return;
      }
    }

    const allFilesSelected = files.every((file) => file !== null);
    if (!allFilesSelected) {
      message.error("All files must be uploaded!");
      return;
    }

    // You can handle the form submission here
    console.log("Form values:", formValues);
    console.log("Files selected:", files);
  };

  return (
    <div className="modal-main-container">
      <div className="overlay"></div>
      <div className="application-modal-container">
        <h3 className="application-header">Application Details</h3>
        <form onSubmit={handleSubmit} className="application-modal-content">
          <div className="application-row">
            <div className="application-first-row">
              <div className="application-content">
                <p>Mobile Number</p>
                <input
                  type="text"
                  name="mobileNumber"
                  className="application-input"
                  placeholder="09"
                  value={formValues.mobileNumber}
                  onChange={handleInputChange}
                  required
                  pattern="\d{10,11}"
                  maxLength="11"
                  title="Mobile number should be 10-11 digits"
                />
              </div>
            </div>
            <div className="application-second-row">
              <div className="application-content">
                <p>Lastname</p>
                <input
                  type="text"
                  name="lastName"
                  className="application-input"
                  placeholder="Lastname"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="application-content">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  className="application-input"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="application-content">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  className="application-input"
                  placeholder="Email Address"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="application-third-row">
              <div className="application-content">
                <p>Country</p>
                <select
                  name="country"
                  className="application-select"
                  value={formValues.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="application-content">
                <p>Province/State</p>
                <select
                  name="province"
                  className="application-select"
                  value={formValues.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="CA-ON">Ontario</option>
                  <option value="CA-BC">British Columbia</option>
                  <option value="US-NY">New York</option>
                  <option value="US-CA">California</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="application-content">
                <p>City/Town</p>
                <select
                  name="city"
                  className="application-select"
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="application-fourth-row">
              <div className="application-content">
                <p>Zipcode</p>
                <select
                  name="zipcode"
                  className="application-select"
                  value={formValues.zipcode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Zipcode</option>
                  <option value="10001">10001</option>
                  <option value="90001">90001</option>
                  <option value="M5H">M5H</option>
                  <option value="V5K">V5K</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="address-input">
                <p>House No/Unit/Building Name/Street</p>
                <input
                  type="text"
                  name="address"
                  className="application-input"
                  placeholder="Enter House No/Unit/Building Name/Street"
                  value={formValues.address}
                  onChange={handleInputChange}
                  required
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
            <FileUploadGrid validateFiles={validateFiles} />
          </div>
          <div className="application-submitbtn">
            <Button id="application-submitbtn" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
