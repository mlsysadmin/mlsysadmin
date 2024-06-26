import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserCircle from "../../assets/icons/UserCircle";
import "../../styles/SupportNavigation.css";
import "../../styles/navlinkCustom.css";

import { IoMdArrowDropdown } from "react-icons/io";

const SupportNavigation = ({ navLinkProps }) => {
  const defaultNavLinkProps = [
    { text: "Create listing", to: "/create-listing" },
    {
      text: "Listing Masterlist",
      dropdown: true,
      options: [
        { text: "Dashboard", to: "/dashboard/Support" },
        { text: "Masterlist", to: "/dashboard/Support/masterlist" },
        { text: "Option 3", to: "/dashboard/Support/option3" },
        { text: "Option 4", to: "/dashboard/Support/option4" },
      ],
    },
    { text: "Client Management", to: "/client-management" },
  ];
  const linksToRender = navLinkProps || defaultNavLinkProps;

  const location = useLocation();

  const [showMasterlistOptions, setShowMasterlistOptions] = useState(false);

  const handleMasterlistToggle = () => {
    setShowMasterlistOptions(!showMasterlistOptions);
  };

  const isLinkActive = (link) => {
    if (link.dropdown) {
      return link.options.some((option) =>
        location.pathname.startsWith(option.to)
      );
    }
    return location.pathname === link.to;
  };

  return (
    <div className="support-navigation-bar">
      <div className="leftSideNavigationBar">
        <img
          className="image"
          alt="Image"
          src="https://c.animaapp.com/1RDRTvCv/img/image-87-1@2x.png"
        />
        <div className="custom-nav-link">
          {linksToRender.map((link, index) => (
            <React.Fragment key={index}>
              {link.dropdown ? (
                <div
                  className={`nav-link dropdown ${
                    isLinkActive(link) ? "nav-link-active" : ""
                  }`}
                >
                  <div
                    className="nav-link-text"
                    onClick={handleMasterlistToggle}
                  >
                    <p className="navlnk">{link.text}</p>
                  </div>
                  {showMasterlistOptions && (
                    <div className="dropdown-options">
                      {link.options.map((option, optionIndex) => (
                        <NavLink
                          key={optionIndex}
                          to={option.to}
                          className={`nav-link ${
                            location.pathname.startsWith(option.to)
                              ? "nav-link-active"
                              : ""
                          }`}
                        >
                          <p className="opt">{option.text}</p>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.to}
                  className={`nav-link ${
                    isLinkActive(link) ? "nav-link-active" : ""
                  }`}
                >
                  {link.text}
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="rightSideNavigationBar">
        <div className="div">
          <p>Irene Joy Andaless</p> <p><IoMdArrowDropdown /></p>
        </div>
      </div>
    </div>
  );
};

export default SupportNavigation;
