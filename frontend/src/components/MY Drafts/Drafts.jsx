import React, { useState } from "react";
// import styled from "styled-components";
import Navigation from "../layout/NavigationComponent";
import SidebarComponent from "./Components/SidebarComponent";
import ListingsTableComponent from "./Components/ListingsTableComponent";
import FooterComponent from "./Components/FooterComponent";

const Drafts = () => {
  return (
    <div>
      <Navigation />
      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap:'1rem' }}
      >
        <div className="sidebar" style={{width:'15%',padding:'none'}}>
          <SidebarComponent />
        </div>
        <div className="table" style={{width:'80%'}}>
          <ListingsTableComponent />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Drafts;
