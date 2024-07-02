import React, { useState, useEffect } from "react";
import '../../styles/CustomTextField.css'
const CustomTextField = (props) => {
  const { labelName, inputStyle, inputType } = props;
  return (
    <div className="text-field">
      <label htmlFor={labelName} className="textLabel">
        {labelName}
      </label>
      {inputType === "input" ? (
        <input
          type="text"
          name={labelName}
          placeholder={`Enter ${labelName}`}
          className="textField"
        />
      ) : (
        <textarea
          name={labelName}
          placeholder={labelName === "Address" ? "Enter Complete Address" : `Enter ${labelName}`}
          className="textField"
        />
      )}
    </div>
  );
};
export default CustomTextField;
