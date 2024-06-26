import React, { useState, useEffect } from "react";

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
          style={inputStyle}
        />
      ) : (
        <textarea
          name={labelName}
          placeholder={labelName === "Address" ? "Enter Complete Address" : `Enter ${labelName}`}
          className="textField"
          style={inputStyle}
        />
      )}
    </div>
  );
};
export default CustomTextField;
