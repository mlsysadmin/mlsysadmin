import React, { useState } from "react";
import { Steps } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../../styles/listing-steps.css";

const { Step } = Steps;

const ListingSteps = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Property Details",
      completed: current > 0,
    },
    {
      title: "Unit Details",
      completed: current > 1,
    },
    {
      title: "Location",
      completed: current > 2,
    },
    {
      title: "Description",
      completed: current > 3,
    },
    {
      title: "Upload Photos",
      completed: current > 4,
    },
    {
      title: "Features",
      completed: current > 5,
    },
    {
      title: "Contact",
      completed: current > 6,
    },
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
            key={index}
            title={step.title}
            icon={step.completed ? <CheckOutlined /> : null}
            status={step.completed ? "finish" : "wait"}
          />
        ))}
      </Steps>
    </div>
  );
};

export default ListingSteps;
