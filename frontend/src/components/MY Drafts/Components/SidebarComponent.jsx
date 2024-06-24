// SidebarComponent.js
import React from "react";
import "../../../styles/SidebarComponent.css";

const Container = (props) => {
  return <div className="container">{props.children}</div>;
};

const SidebarContainer = (props) => {
  return <div className="sidebar-container">{props.children}</div>;
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

const Sidebar = () => {
  return (
    <Container>
      <SidebarContainer>
        <SidebarHeader>Marie Rodriguez</SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/drafts" style={{ color: "Black" }}>
              My Drafts
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="/listingsapproval" style={{ color: "Black" }}>
              Listings
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="/active-inactive" style={{ color: "Black" }}>
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