import React from "react";
import "../../styles/dell.css";

export const Dell = ({ className, ellipseClassName }) => {
  return (
    <div className={`dell ${className}`}>
      <div className={`ellipse ${ellipseClassName}`} />
    </div>
  );
};

export default Dell;
