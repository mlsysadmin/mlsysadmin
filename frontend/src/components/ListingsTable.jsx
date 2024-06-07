import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ConfigProvider, Space } from 'antd';

const Container = styled.div`
  width:100%;
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
  background-color: ${(props) => (props.active ? '#fff' : '#f8f9fa')};
  box-shadow: ${(props) => (props.active ? '0px 2px 5px rgba(0, 0, 0, 0.1)' : 'none')};
  border-radius: ${(props) => (props.active ? '10px 10px 0 0' : 'none')};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
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
  background-color: ${(props) => (props.even ? '#f9f9f9' : '#fff')};
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
//   background-color: #007bff;
  color: black;
  border-radius: 10px ;
  border:1px solid;
  cursor: pointer;
  &:hover {
    background-color: #8C9094;
  }
`;

const ShowDetailsButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #8C9094;
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
const NewButton =styled.div`
background-color: #FFFFFF;
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


const ListingsTable = () => {
  const [listings] = useState([
    {
      date: '03-11-2024',
      propertyId: '11X8NBSADAFO',
      propertyType: 'Condominium',
      type: 'For Sale',
      floorArea: '30 sqm',
      price: '5,000,000',
      location: 'Mandaue City, Cebu',
      status: 'Draft',
      action: ['Edit', 'Remove']
    },
    {
      date: '03-11-2024',
      propertyId: 'ODFASHUENOPS',
      propertyType: 'Condominium',
      type: 'For Sale',
      floorArea: '30 sqm',
      price: '5,000,000',
      location: 'Mandaue City, Cebu',
      status: 'Draft',
      action: ['Edit', 'Remove']
    }
  ]);

  return (
    <div>
     
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
      {/* <PlayCircleOutlined /> */}
            {listings.map((listing, index) => (
              <Row key={index} even={index % 2 === 0}>
                <Cell><ShowDetailsButton>Show Details</ShowDetailsButton></Cell>
                <Cell>{listing.date}</Cell>
                <Cell>{listing.propertyId}</Cell>
                <Cell>{listing.propertyType}</Cell>
                <Cell>{listing.type}</Cell>
                <Cell>{listing.floorArea}</Cell>
                <Cell>{listing.price}</Cell>
                <Cell>{listing.location}</Cell>
                <Cell>{listing.status}</Cell>
                <Cell>
                  <ActionButtons>
                    {listing.action.map((action, index) => (
                      <ActionButton key={index}>
                        {action}
                      </ActionButton>
                    ))}
                  </ActionButtons>
                </Cell>
              </Row>
            ))}
         
    </div>
    
  );
};

export default ListingsTable;

