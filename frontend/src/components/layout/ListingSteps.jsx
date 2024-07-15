import React from "react";
import { Steps } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../../styles/listing-steps.css";

const { Step } = Steps;

const ListingSteps = ({ current, setCurrent }) => {
  const steps = [
    { title: "Property Details", completed: current > 0 },
    { title: "Unit Details", completed: current > 1 },
    { title: "Location", completed: current > 2 },
    { title: "Description", completed: current > 3 },
    { title: "Upload Photos", completed: current > 4 },
    { title: "Features", completed: current > 5 },
    { title: "Contact", completed: current > 6 },
  ];

  const onChange = (value) => {
    console.log("onchange: ", value);
    setCurrent(value);
  };

  return (
    <div className="listing-steps-container">
      <div className="step-intro">
        <p className="p">Steps to complete your listing</p>
      </div>
      <Steps
        className="steps"
        current={current}
        onChange={onChange}
        direction="vertical"
      >
        {steps.map((step, index) => (
          <Step
            className={`checked ${
              step.title === "Unit Details" ||
              step.title === "Location" ||
              step.title === "Description" ||
              step.title === "Upload Photos" ||
              step.title === "Features"
                ? "highlight"
                : ""
            }`}
            key={index}
            title={step.title}
            icon={step.completed ? <CheckOutlined className="check" /> : null}
            status={step.completed ? "finish" : "wait"}
          />
        ))}
      </Steps>
    </div>
  );
};

export default ListingSteps;