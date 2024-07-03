import React, { useState } from "react";
// import styled from "styled-components";
// import Navigation from "../layout/NavigationComponent";
import SidebarComponent from "./Components/DraftSidebarComponent";
import ListingsTableComponent from "./Components/ListingsTableComponent";
import FooterComponent from "./Components/FooterComponent";
// import MainLayout from "../layout/layout.component";

const Drafts = () => {
  return (
    <div>
      {/* <Navigation /> */}
      {/* <MainLayout/> */}
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
