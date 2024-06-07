import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ListingsTable from "./ListingsTable";
import Footer from "./Footer";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#fff" : "#f8f9fa")};
  box-shadow: ${(props) =>
    props.active ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none"};
  border-radius: ${(props) => (props.active ? "10px 10px 0 0" : "none")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Dropdown = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.even ? "#f9f9f9" : "#fff")};
  height: 10%;
`;

const Cell = styled.div`
  flex: 1;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  border: none;
  background-color: #3d8857;
  color: black;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #8c9094;
  }
`;

const ShowDetailsButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #8c9094;
  color: black;
  border-radius: 10px;
  //   border:1px solid;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
`;

const ListingsTableWrapper = styled.div`
  background-color: #e9ecef;
  border-radius: 10px;
  width: 100%;
`;
const NewButton = styled.div`
  background-color: #ffffff;
  border: none;
  color: black;
  padding: 25px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
const ClientManagement = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div
          className="contentContainer"
          style={{ display: "flex", width: "100%", gap: "1rem" }}
        >
          <div className="sidebar" style={{ width: "15%", padding: "none" }}>
            <Sidebar />
          </div>
          <div
            className="list"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              gap: "0.5rem",
            }}
          >
          <ListingsTableWrapper>
            <Container>
              <HeaderSection>
                <Tabs>
                  <NewButton type="primary" size="large">
                    Listings
                  </NewButton>
                  <NewButton type="primary" size="large">
                    Client Management
                  </NewButton>
                  {/* <Tab active>Listings</Tab>
              <Tab>Client Management</Tab> */}
                </Tabs>
                <SearchSection>
                  <Dropdown>
                    <option>Show entries</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Dropdown>
                  <SearchInput type="text" placeholder="Search Property" />
                </SearchSection>
              </HeaderSection>
              <Table>
                <Header>
                  <Cell>Select</Cell>
                  <Cell>Date</Cell>
                  <Cell>Property ID</Cell>
                  <Cell>Property Type</Cell>
                  <Cell>Type</Cell>
                  <Cell>Floor Area</Cell>
                  <Cell>Price</Cell>
                  <Cell>Location</Cell>
                  <Cell>Status</Cell>
                  <Cell>Action</Cell>
                </Header>
              </Table>
            </Container>
          </ListingsTableWrapper>
          </div>
          
        </div>
      </div>
      <Footer/>
    </div>
    
   
  );
};

export default ClientManagement;
