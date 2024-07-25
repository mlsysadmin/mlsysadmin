import React, { useState, useEffect } from "react";
import "../../../styles/support/CustomTextField.css";
import { Input, Te } from "antd";

const { TextArea } = Input;

const CustomTextField = (props) => {
  const { labelName, inputStyle, inputType, disabled } = props;
  return (
    <div className="text-field">
      <label htmlFor={labelName} className="textLabel">
        {labelName}
      </label>
      {inputType === "input" ? (
        <Input
          type="text"
          name={labelName}
          placeholder={`Enter ${labelName}`}
          className="textField"
          disabled={disabled}
          size="large"
        />
      ) : (
        <TextArea
          disabled={disabled}
          name={labelName}
          placeholder={
            labelName === "Address"
              ? "Enter Complete Address"
              : `Enter ${labelName}`
          }
          className="textField"
        />
      )}
    </div>
  );
};
export default CustomTextField;
