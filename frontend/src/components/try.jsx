import React, { useState } from 'react';
import styled from 'styled-components';

const ListingsTableWrapper = styled.div`
  /* Add your styles for the listings table wrapper */
`;

const Container = styled.div`
  /* Add your styles for the container */
`;

const HeaderSection = styled.div`
  /* Add your styles for the header section */
`;

const Tabs = styled.div`
  /* Add your styles for the tabs */
`;

const NewButton = styled.button`
  /* Add your styles for the new button */
`;

const SearchSection = styled.div`
  /* Add your styles for the search section */
`;

const Dropdown = styled.select`
  /* Add your styles for the dropdown */
`;

const SearchInput = styled.input`
  /* Add your styles for the search input */
`;

const Table = styled.table`
  /* Add your styles for the table */
`;

const Header = styled.thead`
  /* Add your styles for the table header */
`;

const Cell = styled.td`
  /* Add your styles for the table cells */
`;

const Row = styled.tr`
  /* Add your styles for the table rows */
  background-color: ${props => props.even ? '#f2f2f2' : 'transparent'};
`;

const ShowDetailsButton = styled.button`
  /* Add your styles for the show details button */
`;

const ActionButtons = styled.div`
  /* Add your styles for the action buttons container */
`;

const ActionButton = styled.button`
  /* Add your styles for the individual action buttons */
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
      datesold: '03-14-2024',
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
      datesold: '03-14-2024',
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
              <Cell>Date Sold</Cell>
              <Cell>Action</Cell>
            </Header>
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
                <Cell>{listing.datesold}</Cell>
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
          </Table>
        </Container>
      </ListingsTableWrapper>
    </div>
  );
};

export default ListingsTable;