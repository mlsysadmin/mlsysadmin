import React, { useState } from "react";
// import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ListingsTable from "./ListingsTable";
import Footer from "./Footer";

const Drafts = () => {
  return (
    <div>
      <Navbar />
      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap:'1rem' }}
      >
        <div className="sidebar" style={{width:'15%',padding:'none'}}>
          <Sidebar />
        </div>
        <div className="table" style={{width:'80%'}}>
          <ListingsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Drafts;
