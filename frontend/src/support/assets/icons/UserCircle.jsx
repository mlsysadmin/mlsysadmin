import React from "react";

const UserCicrle = ({ className }) => {
  return (
    <svg
      className={`user-cicrle ${className}`}
      fill="none"
      height="36"
      viewBox="0 0 37 36"
      width="37"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        className="ellipse"
        cx="18.5"
        cy="15"
        rx="4.625"
        ry="4.5"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <ellipse className="ellipse" cx="18.5" cy="18" rx="13.875" ry="13.5" stroke="white" strokeWidth="2" />
      <path
        className="path"
        d="M27.3958 28.2481C27.6 28.139 27.6967 27.8972 27.608 27.6834C27.0109 26.2433 25.8696 24.9753 24.3297 24.0499C22.6572 23.0448 20.6081 22.5 18.5 22.5C16.3919 22.5 14.3428 23.0448 12.6703 24.0498C11.1304 24.9753 9.9891 26.2433 9.39198 27.6833C9.30332 27.8972 9.40001 28.139 9.60418 28.2481C15.163 31.2175 21.837 31.2175 27.3958 28.2481Z"
        fill="white"
      />
    </svg>
  );
};
export default UserCicrle;