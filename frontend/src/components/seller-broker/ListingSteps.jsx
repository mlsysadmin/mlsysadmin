import React, { useState } from "react";
import { Steps } from 'antd';


const { Step } = Steps;

const ListingSteps = ({ steps, currentStep }) => {
  return (
    <Steps direction="vertical" current={currentStep}>
      {steps.map((step, index) => (
        <Step key={index} title={step.title}/>
      ))}
    </Steps>
  )
}

export default ListingSteps;