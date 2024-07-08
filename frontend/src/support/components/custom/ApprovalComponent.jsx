import React, { useState } from "react";
import "../../styles/ApprovalComponent.css"
const ApprovalComponent = ({ initialLayer = 1, buttonLabels = {} }) => {
  const [currentLayer, setCurrentLayer] = useState(initialLayer);
  const [remarks, setRemarks] = useState({
    layer1: "",
    layer2: "",
    layer3: "",
  });
  const [approverNames, setApproverNames] = useState({
    layer1: "",
    layer2: "",
    layer3: "",
  });
  const [details, setDetails] = useState({
    layer1: null,
    layer2: null,
    layer3: null,
  });
  const [nameError, setNameError] = useState({
    layer1: false,
    layer2: false,
    layer3: false,
  });
  const [remarksError, setRemarksError] = useState({
    layer1: false,
    layer2: false,
    layer3: false,
  });

  const handleApprove = async (layer) => {
    try {
      // Fetch current universal time from an API (replace with your API endpoint)
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      const currentTime = new Date(data.utc_datetime).toLocaleString();
  
      const approverName = approverNames[layer];
      const approverRemarks = remarks[layer];
  
      if (!approverName) {
        setNameError({ ...nameError, [layer]: true });
        return;
      } else {
        setNameError({ ...nameError, [layer]: false });
      }
  
      if (!approverRemarks) {
        setRemarksError({ ...remarksError, [layer]: true });
        return;
      } else {
        setRemarksError({ ...remarksError, [layer]: false });
      }
  
      const newDetails = {
        ...details,
        [layer]: { approverName, time: currentTime },
      };
      setDetails(newDetails);
  
      if (layer === "layer1") {
        setCurrentLayer(2);
      } else if (layer === "layer2") {
        setCurrentLayer(3);
      } else if (layer === "layer3") {
        setCurrentLayer(4); 
      }
    } catch (error) {
      console.error('Error fetching current time:', error);
      // Handle error if fetching time fails
    }
  };
  

  const handleCancel = () => {
    alert("Approval process cancelled.");
    setCurrentLayer(initialLayer);
    setRemarks({ layer1: "", layer2: "", layer3: "" });
    setApproverNames({ layer1: "", layer2: "", layer3: "" });
    setDetails({ layer1: null, layer2: null, layer3: null });
    setNameError({ layer1: false, layer2: false, layer3: false });
    setRemarksError({ layer1: false, layer2: false, layer3: false });
  };

  const handlePending = () => {
    alert("Approval marked as pending.");
  };

  const handleNoted = () => {
    alert("Approval noted.");
  };

  return (
    <div className="approvalContainer">
      <h2>Level of Approvals</h2>

      {/* Layer 1 */}
      <div>
        <h3>Level 1 Approval</h3>
        <div>
          <label>
            Noted by:
            <input
              type="text"
              value={approverNames.layer1}
              onChange={(e) =>
                setApproverNames({ ...approverNames, layer1: e.target.value })
              }
              disabled={currentLayer !== 1}
            />
          </label>
          {nameError.layer1 && (
            <p style={{ color: "red" }}>Please enter the approver's name.</p>
          )}
          <p>Date Approved: {details.layer1?.time}</p>
        </div>
        <textarea
          value={remarks.layer1}
          onChange={(e) => setRemarks({ ...remarks, layer1: e.target.value })}
          placeholder="Enter Remarks"
          disabled={currentLayer !== 1}
        />
        {remarksError.layer1 && (
          <p style={{ color: "red" }}>Please enter remarks.</p>
        )}
        {currentLayer === 1 && (
          <div className="Buttons">
            <button className="approve" onClick={() => handleApprove("layer1")}>
              {buttonLabels.approve || "Approve"}
            </button>

            <button className="disapproved" onClick={handleCancel}>
              {buttonLabels.disapprove || "Deny Listing"}
            </button>
          </div>
        )}
      </div>

      {/* Layer 2 */}
      <div>
        <h3>Level 2 Approval</h3>
        <div>
          <label>
            Approver:
            <input
              type="text"
              value={approverNames.layer2}
              onChange={(e) =>
                setApproverNames({ ...approverNames, layer2: e.target.value })
              }
              disabled={currentLayer !== 2}
            />
          </label>
          {nameError.layer2 && (
            <p style={{ color: "red" }}>Please enter the approver's name.</p>
          )}
          <p>Date Approved: {details.layer2?.time}</p>
        </div>
        <textarea
          value={remarks.layer2}
          onChange={(e) => setRemarks({ ...remarks, layer2: e.target.value })}
          placeholder="Enter Remarks"
          disabled={currentLayer !== 2}
        />
        {remarksError.layer2 && (
          <p style={{ color: "red" }}>Please enter remarks.</p>
        )}
        {currentLayer === 2 && (
          <div className="Buttons">
            <button className="approve" onClick={() => handleApprove("layer2")}>
              {buttonLabels.approve || "Approve"}
            </button>
            <button className="disapproved" onClick={handleCancel}>
              {buttonLabels.disapprove || "Deny Listing"}
            </button>
          </div>
        )}
      </div>

      {/* Layer 3 */}
      <div>
        <h3>Level 3 Approval</h3>
        <div>
          <label>
            Approver:
            <input
              type="text"
              value={approverNames.layer3}
              onChange={(e) =>
                setApproverNames({ ...approverNames, layer3: e.target.value })
              }
              disabled={currentLayer !== 3}
            />
          </label>
          {nameError.layer3 && (
            <p style={{ color: "red" }}>Please enter the approver's name.</p>
          )}
          <p>Date Approved: {details.layer3?.time}</p>
        </div>
        <textarea
          value={remarks.layer3}
          onChange={(e) => setRemarks({ ...remarks, layer3: e.target.value })}
          placeholder="Enter Remarks"
          disabled={currentLayer !== 3}
        />
        {remarksError.layer3 && (
          <p style={{ color: "red" }}>Please enter remarks.</p>
        )}
        {currentLayer === 3 && (
          <div className="Buttons">
            <button className="approve" onClick={() => handleApprove("layer3")}>
              {buttonLabels.approve || "Approve"}
            </button>
            <button className="disapproved" onClick={handleCancel}>
              {buttonLabels.disapprove || "Deny Listing"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalComponent;
