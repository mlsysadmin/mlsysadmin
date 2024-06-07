import React from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
`;

const SidebarContainer = styled.div`
  background-color: #f0f0f0;
  height: 350px;
  border-radius: 30px;
  padding: 0.1rem;
`;

const SidebarHeader = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  //   gap: 0.5rem;
`;

const SidebarMenuItem = styled.div`
  cursor: pointer;
  padding: 1.5rem; /* Add some padding for better appearance */

  &:hover {
    background-color: #d90000;
    color: #fff; /* Ensure text color contrasts with the red background */
    transform: translateX(3px);
  }
`;

const CreateListingButton = styled.button`
  background-color: #d90000;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Sidebar = () => {
  return (
    <div>
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
    </div>
  );
};

export default Sidebar;
