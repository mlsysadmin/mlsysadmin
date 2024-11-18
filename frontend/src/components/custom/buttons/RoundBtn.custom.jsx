import { Button } from "antd";
import React from "react";

const RoundBtn = ({ label, style, className, type, beforeIcon, afterIcon , onClick, shape}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      shape={shape}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {beforeIcon}
      {label}
      {afterIcon}
    </Button>
  );
};

export default RoundBtn;
