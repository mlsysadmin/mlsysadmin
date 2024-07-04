import React, { useState } from "react";
import "../../../styles/DraftSidebarComponent.css";

const Container = (props) => {
  return <div className="drafts-container">{props.children}</div>;
};

const SidebarContainer = (props) => {
  return (
    <div
      className={`sidebar-container ${props.isOpen ? "open" : ""}`}
      onClick={props.onClose}
    >
      {" "}
      {props.children}{" "}
    </div>
  );
};

const SidebarHeader = (props) => {
  return <div className="sidebar-header">{props.children}</div>;
};

const SidebarMenu = (props) => {
  return <div className="sidebar-menu">{props.children}</div>;
};

const SidebarMenuItem = (props) => {
  return <div className="sidebar-menu-item">{props.children}</div>;
};

const CreateListingButton = (props) => {
  return <button className="create-listing-button">{props.children}</button>;
};

const HamburgerButton = ({ onClick }) => {
  return (
    <div className="hamburger" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsClose(!isClose);
  };

  return (
    <Container>
      <HamburgerButton onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen} isClose={isClose}>
        <SidebarHeader>Marie Rodriguez</SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/MyDrafts" style={{ color: "Black" }}>
              My Drafts
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="/listing-summary-lists" style={{ color: "Black" }}>
              Listings
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="/active-summary-lists" style={{ color: "Black" }}>
              Active/Inactive
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="/sold-properties" style={{ color: "Black" }}>
              Sold Properties
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContainer>
      <CreateListingButton>Create Listing</CreateListingButton>
    </Container>
  );
};

export default Sidebar;
