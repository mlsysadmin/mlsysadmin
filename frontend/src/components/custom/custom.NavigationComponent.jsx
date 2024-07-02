import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import "../../styles/SupportNavigation.css";

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
    {
      text: "Application Review",
      dropdown: true,
      options: [
        { text: "Open Applications", to: "/dashboard/Support/openApplication" },
        {
          text: "Pending Applications",
          to: "/dashboard/Support/pendingApplication",
        },
        {
          text: "Disapproved Applications",
          to: "/dashboard/Support/disapprovedApplication",
        },
      ],
    },
    { text: "Client Management", to: "/client-management" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const linksToRender = navLinkProps || defaultNavLinkProps;

  const handleNavLinkClick = () => {
    setMenuOpen(false); // Close menu after selecting a link
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLinkActive = (link) => {
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
        <div className="menu-toggle" onClick={toggleMenu}>
          <FiMenu size={24} color="#fff" />
        </div>
        <div className={`custom-nav-link ${menuOpen ? "open" : ""}`}>
          <div className="menu-toggle" onClick={toggleMenu}>
            <FiMenu size={24} color="#fff" />
          </div>
          {linksToRender.map((link, index) => (
            <React.Fragment key={index}>
              {link.dropdown ? (
                <div className="dropdown">
                  <div
                    className={`nav-link ${
                      isLinkActive(link) ? "nav-link-active" : ""
                    }`}
                  >
                    <p className="navlnk" onClick={toggleMenu}>
                      {link.text} <IoMdArrowDropdown />
                    </p>
                  </div>
                  <div className="dropdown-options">
                    {link.options.map((option, optionIndex) => (
                      <NavLink
                        key={optionIndex}
                        to={option.to}
                        className={`nav-link ${
                          location.pathname === option.to
                            ? "nav-link-active"
                            : ""
                        }`}
                        onClick={handleNavLinkClick}
                      >
                        {option.text}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={link.to}
                  className={`nav-link ${
                    isLinkActive(link) ? "nav-link-active" : ""
                  }`}
                  onClick={handleNavLinkClick}
                >
                  {link.text}
                </NavLink>
              )}
            </React.Fragment>
          ))}
          <div className="user">
            <div className="div">
              Irene Joy Andales <IoMdArrowDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="rightSideNavigationBar">
        <div className="div">
          Irene Joy Andales <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default SupportNavigation;
